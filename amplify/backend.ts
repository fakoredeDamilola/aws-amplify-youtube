import { defineBackend } from '@aws-amplify/backend';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { addThumbnailToVideo } from './functions/addThumbnailToVideo/resource';
import { createS3VideoSprite } from './functions/createS3VideoSprite/resource';

const backend = defineBackend({
  auth,
  data,
  addThumbnailToVideo,
  createS3VideoSprite,
  storage,
});



// Create a role that MediaConvert will assume when processing jobs
const mediaConvertRole = new iam.Role(
  backend.stack,
  "MediaConvertServiceRole",
  {
    assumedBy: new iam.ServicePrincipal("mediaconvert.amazonaws.com"),
  }
)

// Allow MediaConvert to read/write from S3 and access its own APIs
mediaConvertRole.addToPolicy(
  new iam.PolicyStatement({
    actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket'],
    resources: ['*'],
  }),
);

mediaConvertRole.addToPolicy(
  new iam.PolicyStatement({
    actions: ['mediaconvert:*', 'iam:PassRole'],
    resources: ['*'],
  }),
);

// Allow the Lambda to call MediaConvert and pass the MediaConvert role
backend.addThumbnailToVideo.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: [
      'mediaconvert:CreateJob',
      'mediaconvert:DescribeEndpoints',
    ],
    resources: ['*'],
  }),
);

backend.addThumbnailToVideo.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ['iam:PassRole'],
    resources: [mediaConvertRole.roleArn],
  }),
);


backend.storage.resources.bucket.addEventNotification(
  s3.EventType.OBJECT_CREATED,
  new s3n.LambdaDestination(
    backend.addThumbnailToVideo.resources.lambda
  ),
  { prefix: "videos/" }
);
