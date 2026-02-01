import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyYoutubeStorage',
  access: (allow) => ({
    'videos/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'thumbnails/*': [
      allow.guest.to(['read', 'write', 'delete'])
    ],
    'outputs/*': [
     allow.guest.to(['read'])
    ],
  }),
});