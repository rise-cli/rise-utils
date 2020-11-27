const AWS = require('aws-sdk')
const formatCreateItem = require('./utils/formatKeys')

const region = process.env.REGION || 'us-east-1'
const db = new AWS.DynamoDB.DocumentClient({
  region: region
})

/**
 * Get
 *
 */
const get = async (input, table = process.env.TABLE) => {
  if (!input.SK) {
    throw new Error('Input must have SK defined')
  }

  if (input.PK) {
    const item = await db
      .get({
        TableName: table,
        Key: {
          PK: input.PK,
          SK: input.SK
        }
      })
      .promise()

    return item.Item || false
  }

  if (input.GSI1) {
    const item = await db
      .get({
        TableName: table,
        Key: {
          GSI1: input.GSI1,
          SK: input.SK
        }
      })
      .promise()

    return item.Item || false
  }
  if (input.GSI2) {
    const item = await db
      .get({
        TableName: table,
        Key: {
          GSI2: input.GSI2,
          SK: input.SK
        }
      })
      .promise()

    return item.Item || false
  }

  throw new Error('Input must have PK, GSI1, or GSI2 defined')
}

/**
 * Query
 *
 */
const list = async (input, table = process.env.TABLE) => {
  if (!input.SK) {
    throw new Error('Input must have SK defined')
  }

  if (!input.PK && !input.GSI1 && !input.GSI2) {
    throw new Error('Input must have either PK, GSI1, or GSI2 defined')
  }

  let params = {}

  if (input.PK) {
    params = {
      TableName: table,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': input.PK,
        ':sk': input.SK
      }
    }
  }

  if (input.GSI1) {
    params = {
      TableName: table,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1 = :gsi AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':gsi': input.GSI1,
        ':sk': input.SK
      }
    }
  }

  if (input.GSI2) {
    params = {
      TableName: table,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2 = :gsi AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':gsi': input.GSI2,
        ':sk': input.SK
      }
    }
  }

  const result = await db.query(params).promise()
  return result.Items || []
}

/**
 * Create
 *
 */
const create = async (input, table = process.env.TABLE) => {
  if (!input.PK && !input.GSI1 && !input.GSI2) {
    throw new Error('create must have either PK, GSI1, or GSI2 defined')
  }

  if (!input.SK) {
    throw new Error('create must have a SK defined')
  }

  const createItem = async () => {
    const formattedInput = formatCreateItem(input)

    await db
      .put({
        TableName: table,
        Item: formattedInput,
        ConditionExpression: 'attribute_not_exists(SK)'
      })
      .promise()

    return formattedInput
  }

  try {
    return await createItem()
  } catch (e) {
    if (
      e.message.includes('ConditionalCheckFailedException') &&
      input.SK.includes('@id')
    ) {
      return await createItem()
    }
    throw new Error(e)
  }
}

/**
 * Set
 *
 */
const set = async (input, table = process.env.TABLE) => {
  if (!input.PK && !input.GSI1 && !input.GSI2) {
    throw new Error('create must have either PK, GSI1, or GSI2 defined')
  }

  if (!input.SK) {
    throw new Error('create must have a SK defined')
  }

  const formattedInput = formatCreateItem(input)
  await db
    .put({
      TableName: table,
      Item: formattedInput
    })
    .promise()

  return formattedInput
}

/**
 * Remove
 *
 */
const remove = async (input, table = process.env.TABLE) => {
  await db
    .delete({
      TableName: table,
      Key: {
        PK: input.PK,
        SK: input.SK
      }
    })
    .promise()
  return input
}

module.exports = {
  get,
  create,
  set,
  list,
  remove
}
