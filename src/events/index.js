const AWS = require('aws-sdk')
const region = process.env.AWS_REGION || 'us-east-1'
const eventbus = process.env.EVENT_BUS || 'default'
const appName = process.env.APP_NAME
const eventbridge = new AWS.EventBridge({ region })

module.exports = {
    send: async ({ event, data }) => {
        if (!event) {
            throw new Error('events.send must have an event defined')
        }

        if (!data) {
            throw new Error('events.send must have data defined')
        }

        if (!appName) {
            throw new Error('process.env.APP_NAME must be defined')
        }

        return await eventbridge
            .putEvents({
                Entries: [
                    {
                        Detail: JSON.stringify(data),
                        DetailType: event,
                        EventBusName: eventbus,
                        Source: 'custom.' + appName,
                        Time: new Date()
                    }
                ]
            })
            .promise()
    }
}
