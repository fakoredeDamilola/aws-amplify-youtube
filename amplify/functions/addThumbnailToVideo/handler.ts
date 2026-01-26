import type { Handler } from 'aws-lambda';
import {
  MediaConvertClient,
  CreateJobCommand,
  DescribeEndpointsCommand,
} from '@aws-sdk/client-mediaconvert';
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "@aws-amplify/api";

const dbClient = generateClient<Schema>();

// Reuse client across invocations
const mediaConvertClient = new MediaConvertClient({ region: process.env.AWS_REGION });

export const handler: Handler = async (event) => {
  console.log('Event: ', JSON.stringify(event, null, 2));

  // Expecting an S3 put event as trigger
  const record = event.Records?.[0];
  if (!record) {
    console.warn('No S3 record in events notify');
    return;
  }

  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
  console.log({bucket,key})
  // Discover MediaConvert endpoint for the account
  const endpoints = await mediaConvertClient.send(new DescribeEndpointsCommand({}));
  const endpointUrl = endpoints.Endpoints?.[0]?.Url;
  if (!endpointUrl) {
    console.error('No MediaConvert endpoint returned');
    return;
  }

  const mediaConvert = new MediaConvertClient({
    endpoint: endpointUrl,
    region: process.env.AWS_REGION,
  });

  const roleArn = process.env.MEDIA_CONVERT_ROLE_ARN;
  if (!roleArn) {
    console.error('MEDIA_CONVERT_ROLE_ARN is not set');
    return;
  }

  // TODO: Replace Settings with a real MediaConvert job template
const videoName = key.slice(6); // "videos/xxx.mp4" -> "xxx.mp4" depending on your prefix
const thumbnailFolder = `s3://${bucket}/thumbnails/`;
const outputFolder = `s3://${bucket}/outputs/`;
console.log({videoName,thumbnailFolder,outputFolder})

 const params: CreateJobCommand["input"] = {
  Role: roleArn,

  Settings: {
    Inputs: [
      {
        FileInput: `s3://${bucket}/${key}`,
      },
    ],

    OutputGroups: [
      // 1️⃣ VIDEO OUTPUT (MP4)
      {
        Name: "File Group",
        OutputGroupSettings: {
          Type: "FILE_GROUP_SETTINGS",
          FileGroupSettings: {
            Destination: outputFolder,
          },
        },
        Outputs: [
          {
            ContainerSettings: {
              Container: "MP4",
            },

            VideoDescription: {
              CodecSettings: {
                Codec: "H_264",
                H264Settings: {
                  RateControlMode: "QVBR",
                  SceneChangeDetect: "TRANSITION_DETECTION",
                  QualityTuningLevel: "SINGLE_PASS",
                  MaxBitrate: 5000000,
                },
              },
            },
            // ✅ AudioDescriptions removed - no audio needed
          },
        ],
      },

      // 2️⃣ THUMBNAIL OUTPUT (JPEG)
      {
        Name: "Thumbnails",
        OutputGroupSettings: {
          Type: "FILE_GROUP_SETTINGS",
          FileGroupSettings: {
            Destination: thumbnailFolder,
          },
        },
        Outputs: [
          {
            ContainerSettings: {
              Container: "RAW",
            },
            VideoDescription: {
              CodecSettings: {
                Codec: "FRAME_CAPTURE",
                FrameCaptureSettings: {
                  FramerateNumerator: 1,
                  FramerateDenominator: 5,
                  MaxCaptures: 1,
                  Quality: 80,
                },
              },
            },
          },
        ],
      },
    ],
  },
};

const result = await mediaConvert.send(new CreateJobCommand(params));
  console.log('MediaConvert job created: ', JSON.stringify(result, null, 2));

  const thumbnailUrl = `s3://${bucket}/thumbnails/${videoName}.0000000.jpg`;
  const videoOutputPath = `s3://${bucket}/outputs/${videoName}.mp4`;
  
  // update dynamodb

  // await dbClient.models.VideosTable.update({
  //   PK: `USER#${event.request.userAttributes.sub}`,
  //   SK: `VIDEO#${Date.now()}`,
  //   // UpdateExpression: 'SET thumbnailUrl = :thumbnailUrl, videoOutputPath = :videoOutputPath',
  //   // ExpressionAttributeValues: {
  //     thumbnailUrl: thumbnailUrl,
  //     videoOutputPath: videoOutputPath,
  //   // },
  // });
  

  return;
};
