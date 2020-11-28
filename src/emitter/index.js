const AWS = require('aws-sdk')
const region = process.env.AWS_REGION || 'us-east-1'
const accountId = process.env.ACCOUNT_ID
const SNS = new AWS.SNS({ region })

module.exports = {
  send: async ({ event, data }) => {
    if (!event) {
      throw new Error('Emitted must have an event defined')
    }

    if (!data) {
      throw new Error('Emitted must have data defined')
    }

    if (!process.env.ACCOUNT_ID) {
      throw new Error('CreateUser must have process.env.ACCOUNT_ID defined')
    }

    return SNS.publish({
      Subject: event,
      Message: JSON.stringify(data),
      TopicArn: `arn:aws:sns:${region}:${accountId}:${event}`
    }).promise()
  }
}
