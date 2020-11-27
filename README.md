# rise-utils

## DB Usage

Required ENVS:

- TABLE
- REGION

```js
const { db } = require('@cnktech/utils')

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

await db.query({
  PK: 'gary@example.com',
  SK: 'task_'
})

await db.query({
  GSI1: 'team_1234',
  SK: 'task_'
})

await db.query({
  GSI2: 'org_1234',
  SK: 'task_'
})
```
