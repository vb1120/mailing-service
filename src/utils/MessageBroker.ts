// imports
import * as amqp from 'amqplib'
import { Connection, Channel, ConsumeMessage } from 'amqplib'
import { envs } from './envs'

const { rabbitmqUri } = envs

/**
 * Broker for async messaging
 * Singleton class
 */
export class MessageBroker {
    // declare class properties
    public connection!: Connection
    public channel!: Channel
    private static instance: MessageBroker

    /**
     * Initialize connection to rabbitMQ
     */
    private async init() {
        this.connection = await amqp.connect(rabbitmqUri)
        this.channel = await this.connection.createChannel()
        return this
    }

    /**
     * This method consumes message from connected application sending on this queue
     * @param queue Queue to be consumed with name
     * @param onMessage Message handler function to be consumed from buffer form
     */
    public async consume(
        queue: string,
        onMessage: (msg: ConsumeMessage | null) => void
    ) {
        await this.channel.assertQueue(queue, { durable: true })

        await this.channel.consume(queue, onMessage, { noAck: true })
    }

    /**
     * This method used to close rabbitmq connection
     */
    public async close() {
        if (!this.connection) {
            await this.init()
        }
        await this.connection.close()
    }

    /**
     * This method for getting message broker instance
     * @returns Singleton instance of Message Broker
     */
    public static async getInstance() {
        if (!MessageBroker.instance) {
            const broker = new MessageBroker()
            MessageBroker.instance = await broker.init()
        }
        return MessageBroker.instance
    }
}
