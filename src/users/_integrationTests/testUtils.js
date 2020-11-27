const AWS = require('aws-sdk')
AWS.config = {
  region: 'us-east-1'
}

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

module.exports = {
  createPool: async () => {
    const params = {
      PoolName: process.env.POOL_NAME /* required */,
      // AccountRecoverySetting: {
      //   RecoveryMechanisms: [
      //     {
      //       Name:
      //         verified_email |
      //         verified_phone_number |
      //         admin_only /* required */,
      //       Priority: 'NUMBER_VALUE' /* required */
      //     }
      //     /* more items */
      //   ]
      // },
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true
      }
    }
    return await cognitoidentityserviceprovider.createUserPool(params).promise()
  }
}
