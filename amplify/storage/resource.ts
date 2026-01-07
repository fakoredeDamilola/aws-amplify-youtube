import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyYoutubeStorage',
  access: (allow) => ({
    'videos/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
});