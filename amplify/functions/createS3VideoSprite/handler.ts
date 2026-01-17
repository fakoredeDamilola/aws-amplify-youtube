import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  console.log('Event: ', event);
  return 'Hello from Lambda!';
};
