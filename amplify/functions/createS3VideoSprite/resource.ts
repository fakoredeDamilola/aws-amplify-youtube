import { defineFunction } from '@aws-amplify/backend';

export const createS3VideoSprite = defineFunction({
  name: 'createS3VideoSprite', // optional, defaults to directory name
  entry: './handler.ts' // optional, defaults to "./handler.ts"
});