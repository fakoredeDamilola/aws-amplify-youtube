import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // Todo: a
  //   .model({
  //     content: a.string(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),
  VideosTable:a
    .model({
      PK: a.string().required(),
      SK: a.string().required(),
      GSI1PK: a.string(),
      GSI1SK: a.string(),
      GSI2PK: a.string(),
      GSI2SK: a.string(),
      GSI3PK: a.string(),
      GSI3SK: a.string(),
      title:a.string(),
      description:a.string(),
      categories:a.string(),
      s3Bucket:a.string(),
      s3Key:a.string(),
      createdAt:a.string(),
      updatedAt:a.string(),
      likesCount:a.integer(),
      dislikesCount:a.integer(),
      viewsCount:a.integer(),
      commentsCount:a.integer(),
      watchCount:a.integer(),
      userId:a.string(),
      channelId:a.string(),
      thumbnailUrl:a.string(),
      videoTimeLength:a.integer(),
      videoType:a.string(),
      channelName:a.string(),
    })
    .identifier(['PK', 'SK'])
    .secondaryIndexes((index) => [
      index('GSI1PK').sortKeys(['GSI1SK']).queryField('listByGSI1'),
      index('GSI2PK').sortKeys(['GSI2SK']).queryField('listByGSI2'),
      index('GSI3PK').sortKeys(['GSI3SK']).queryField('listByGSI3'),
    ])
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
