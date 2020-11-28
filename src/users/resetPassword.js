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
  if (!email) {
    throw new Error('ResetPassword must have an email defined')
  }

  if (!process.env.USERPOOL_ID) {
    throw new Error('CreateUser must have process.env.USERPOOL_ID defined')
  }

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
