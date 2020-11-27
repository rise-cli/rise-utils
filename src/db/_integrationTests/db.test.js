const testUtils = require('./testUtils')
const db = require('../index')
process.env.TABLE = 'rise-int-test'

test('db works', async (done) => {
  try {
    await testUtils.createTable()
  } catch (e) {
    console.log('Table already exists')
  }

  /**
   * Testing Set
   *
   */
  const item = await db.set({
    PK: 'user_1234',
    SK: 'item_1234',
    GSI1: 'team_1234',
    GSI2: 'org_1234'
  })

  expect(item).toEqual({
    PK: 'user_1234',
    SK: 'item_1234',
    GSI1: 'team_1234',
    GSI2: 'org_1234'
  })

  await db.set({
    PK: 'user_1235',
    SK: 'item_1235',
    GSI1: 'team_1234',
    GSI2: 'org_1234'
  })
  await db.set({
    PK: 'user_1236',
    SK: 'item_1236',
    GSI1: 'team_1235',
    GSI2: 'org_1234'
  })

  /**
   * Testing Get
   *
   */
  const getItem = await db.get({
    PK: 'user_1234',
    SK: 'item_1234'
  })

  expect(getItem).toEqual({
    GSI2: 'org_1234',
    SK: 'item_1234',
    GSI1: 'team_1234',
    PK: 'user_1234'
  })

  /**
   * Testing List
   *
   */
  const listItem = await db.list({
    PK: 'user_1234',
    SK: 'item_'
  })

  expect(listItem).toEqual([
    {
      GSI2: 'org_1234',
      SK: 'item_1234',
      GSI1: 'team_1234',
      PK: 'user_1234'
    }
  ])

  const listItem2 = await db.list({
    GSI1: 'team_1234',
    SK: 'item_'
  })

  expect(listItem2).toEqual([
    {
      GSI2: 'org_1234',
      SK: 'item_1234',
      GSI1: 'team_1234',
      PK: 'user_1234'
    },
    {
      GSI2: 'org_1234',
      SK: 'item_1235',
      GSI1: 'team_1234',
      PK: 'user_1235'
    }
  ])

  const listItem3 = await db.list({
    GSI2: 'org_1234',
    SK: 'item_'
  })

  expect(listItem3).toEqual([
    {
      GSI2: 'org_1234',
      SK: 'item_1234',
      GSI1: 'team_1234',
      PK: 'user_1234'
    },
    {
      GSI2: 'org_1234',
      SK: 'item_1235',
      GSI1: 'team_1234',
      PK: 'user_1235'
    },
    {
      GSI2: 'org_1234',
      SK: 'item_1236',
      GSI1: 'team_1235',
      PK: 'user_1236'
    }
  ])

  /**
   * Testing Remove
   *
   */
  const removedItem = await db.remove({
    PK: 'user_1234',
    SK: 'item_1234'
  })

  await db.remove({
    PK: 'user_1235',
    SK: 'item_1235'
  })

  await db.remove({
    PK: 'user_1236',
    SK: 'item_1236'
  })

  expect(removedItem).toEqual({ PK: 'user_1234', SK: 'item_1234' })

  /**
   * Testing Get Empty
   *
   */
  const noItem = await db.get({
    PK: 'user_1234',
    SK: 'item_1234'
  })

  expect(noItem).toEqual(false)

  /**
   * Testing @id
   *
   */
  const idTestItem = await db.set({
    PK: 'user_1235',
    SK: 'item_@id'
  })

  await db.remove(idTestItem)
  done()
})

test('db pagination works', async (done) => {
  const item = await db.set({
    PK: 'team_1234',
    SK: 'item_1234'
  })

  const item2 = await db.set({
    PK: 'team_1234',
    SK: 'item_1235'
  })

  const item3 = await db.set({
    PK: 'team_1234',
    SK: 'item_1236'
  })

  const item4 = await db.set({
    PK: 'team_1234',
    SK: 'item_1237'
  })

  const list1 = await db.list({
    PK: 'team_1234',
    SK: 'item',
    limit: 2
  })

  expect(list1).toEqual([
    { PK: 'team_1234', SK: 'item_1234' },
    { PK: 'team_1234', SK: 'item_1235' }
  ])

  const list2 = await db.list({
    PK: 'team_1234',
    SK: 'item',
    limit: 2,
    startAt: list1[1]
  })

  expect(list2).toEqual([
    { PK: 'team_1234', SK: 'item_1236' },
    { PK: 'team_1234', SK: 'item_1237' }
  ])

  await db.remove(item)
  await db.remove(item2)
  await db.remove(item3)
  await db.remove(item4)
  done()
})
