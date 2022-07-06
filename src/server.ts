import express from 'express'
import { envs } from './envs'
import { MessageBroker } from './MessageBroker'
import { greet } from './greet'

const { port } = envs
const app = express()

MessageBroker.getInstance()
    .then((broker) => {
        broker.consume('mailing', (msg) => {
            if (msg) {
                greet(JSON.parse(msg.content.toString()))
                console.log('Message Received', msg.content.toString())
            }
        })
    })
    .catch((err: Error) => console.log(err.message))

app.listen(port, () => {
    console.log(`Mailing service listening on port ${port}`)
})

process.on('beforeExit', async () => {
    const amqp = await MessageBroker.getInstance()
    console.log('closing')
    await amqp.close()
})
