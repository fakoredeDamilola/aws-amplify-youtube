import { defineFunction } from '@aws-amplify/backend';

export const addThumbnailToVideo = defineFunction({
  name: 'addThumbnailToVideo', // optional, defaults to directory name
  entry: './handler.ts', // optional, defaults to "./handler.ts"
  environment: {
    MEDIA_CONVERT_ROLE_ARN: "arn:aws:iam::017915196139:role/MediaConvert_Role",
  },
});