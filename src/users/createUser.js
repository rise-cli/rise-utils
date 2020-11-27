const aws = require('aws-sdk')
const password = require('../general/password')
const cognito = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'us-east-1'
})

module.exports = async ({ email }) => {
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
