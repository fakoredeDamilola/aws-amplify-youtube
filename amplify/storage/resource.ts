import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyYoutubeStorage',
  access: (allow) => ({
    'videos/{identityId}/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
});