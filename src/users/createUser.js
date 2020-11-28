const aws = require('aws-sdk')
const password = require('../general/password')
const cognito = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'us-east-1'
})

module.exports = async ({ email }) => {
  if (!email) {
    throw new Error('CreateUser must have an email defined')
  }

  if (!process.env.USERPOOL_ID) {
    throw new Error('CreateUser must have process.env.USERPOOL_ID defined')
  }

  const pass = password()
  const params = {
    UserPoolId: process.env.USERPOOL_ID,
    Username: email,
    TemporaryPassword: pass,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      {
        Name: 'name',
        Value: email
      },
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'True'
      }
    ]
  }

  try {
    await cognito.adminCreateUser(params).promise()
    return {
      email,
      password: pass
    }
  } catch (err) {
    console.log('err: ', err.message)
    throw new Error(err)
  }
}
