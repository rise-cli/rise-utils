const aws = require('aws-sdk')
const cognito = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'us-east-1'
})

module.exports = async ({ email }) => {
  if (!email) {
    throw new Error('RemoveUser must have an email defined')
  }

  if (!process.env.USERPOOL_ID) {
    throw new Error('CreateUser must have process.env.USERPOOL_ID defined')
  }

  const params = {
    UserPoolId: process.env.USERPOOL_ID,
    Username: email
  }

  try {
    await cognito.adminDeleteUser(params).promise()
    return true
  } catch (err) {
    throw new Error(err)
  }
}
