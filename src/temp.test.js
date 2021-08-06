const AWS = require('aws-sdk')

const sts = new AWS.STS();
test('testing...', async () => {
    const caller = await sts.getCallerIdentity({}).promise()

    console.log('THE CALLER: ', caller)
})