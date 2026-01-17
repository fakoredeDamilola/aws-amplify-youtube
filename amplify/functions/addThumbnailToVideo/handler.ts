import type { Handler } from 'aws-lambda';
import {
  MediaConvertClient,
  CreateJobCommand,
  DescribeEndpointsCommand,
} from '@aws-sdk/client-mediaconvert';

// Reuse client across invocations
const client = new MediaConvertClient({ region: process.env.AWS_REGION });

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
  const endpoints = await client.send(new DescribeEndpointsCommand({}));
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
  const videoName = key.slice(6)
  const thumbnailOutputUrl = `s3://${bucket}/thumbnails${videoName.slice(0, -4)}.jpeg`
  const videoOutputUrl = `s3://${bucket}/outputs${videoName}`
console.log({videoName,thumbnailOutputUrl,videoOutputUrl})

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
            Name: "MP4 Video",
            OutputGroupSettings: {
              Type: "FILE_GROUP_SETTINGS",
              FileGroupSettings: {
                Destination: videoOutputUrl,
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

                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: "AAC",
                      AacSettings: {
                        Bitrate: 96000,
                        CodingMode: "CODING_MODE_2_0",
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
            ],
          },

          // 2️⃣ THUMBNAIL OUTPUT (JPEG)
          {
            Name: "Thumbnails",
            OutputGroupSettings: {
              Type: "FILE_GROUP_SETTINGS",
              FileGroupSettings: {
                Destination: thumbnailOutputUrl
              },
            },
            Outputs: [
              {
                VideoDescription: {
                  CodecSettings: {
                    Codec: "FRAME_CAPTURE",
                    FrameCaptureSettings: {
                      FramerateNumerator: 1,
                      FramerateDenominator: 5, // 1 frame every 5 seconds
                      MaxCaptures: 1,          // only 1 thumbnail
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

  return;
};
