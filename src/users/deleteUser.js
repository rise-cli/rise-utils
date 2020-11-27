const aws = require('aws-sdk')
const cognito = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'us-east-1'
})

module.exports = async ({ email }) => {
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
