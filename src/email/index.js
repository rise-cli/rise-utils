const AWS = require('aws-sdk')
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: process.env.REGION || 'us-east-1'
})

module.exports = {
  send: async ({ body, subject, from, to }) => {
    const params = {
      Destination: {
        CcAddresses: [],
        ToAddresses: to
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: from,
      ReplyToAddresses: [from]
    }

    const result = await ses.sendEmail(params).promise()
    return result.MessageId
  }
}
