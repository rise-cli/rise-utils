const aws = require('aws-sdk')
const cognito = new aws.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'us-east-1'
})
const createUser = require('./createUser')
const deleteUser = require('./deleteUser')
const password = require('../general/password')

const hasUserUsedTemporaryPassword = async (email) => {
  const params = {
    UserPoolId: process.env.USERPOOL_ID,
    Username: email
  }

  const x = await cognito.adminGetUser(params).promise()
  return x.UserStatus !== 'FORCE_CHANGE_PASSWORD'
}

module.exports = async ({ email }) => {
  const usedTemp = await hasUserUsedTemporaryPassword(email)

  if (usedTemp) {
    return false
  }

  const newPassword = password()

  await deleteUser({ email })
  await createUser({
    email: email,
    password: newPassword
  })

  return {
    email: email,
    password: newPassword
  }
}
