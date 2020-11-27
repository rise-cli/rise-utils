# rise-utils

## DB Usage

Required ENVS:

- TABLE
- REGION (default is us-east-1)

```js
const { db } = require('rise-utils')

await db.create({
  PK: 'gary@example.com',
  SK: 'task_@id',
  ...data
})

await db.set({
  PK: 'gary@example.com',
  SK: 'task_@id',
  ...data
})

await db.remove({
  PK: 'gary@example.com',
  SK: 'task_24',
  ...data
})

await db.get({
  PK: 'gary@example.com',
  SK: 'task_24'
})

await db.list({
  PK: 'gary@example.com',
  SK: 'task_'
})

await db.list({
  GSI1: 'team_1234',
  SK: 'task_'
})

await db.list({
  GSI2: 'org_1234',
  SK: 'task_'
})

// Pagination: get first page
await db.list({
  PK: 'gary@example.com',
  SK: 'task_',
  limit: 10
})

// Pagination: get second page
await db.list({
  PK: 'gary@example.com',
  SK: 'task_',
  limit: 10,
  startAt: {
    PK: 'gary@example.com',
    SK: 'task_11
  }
})


```

## Users Usage

Required ENV

- USERPOOL_ID

```js
const { users } = require('rise-utils')

await users.create({
  email: 'gary@example.com'
})

await users.remove({
  email: 'gary@example.com'
})

await users.resetPassword({
  email: 'gary@example.com'
})
```

## Email Usage

Consider using `https://mjml.io` for email html

```js
const { email } = require('rise-utils')

await email.send({
  body: '<p>hello</p>',
  subject: 'Welcome',
  to: 'john@example.com',
  from: 'test@example.com'
})
```
