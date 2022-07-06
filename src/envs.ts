import 'dotenv/config'

interface Env {
    nodeEnv: string
    port: number
    rabbitmqUri: string
}

export const envs: Env = {
    nodeEnv: <string>process.env.NODE_ENV,
    port: parseInt(<string>process.env.PORT),
    rabbitmqUri: <string>process.env.RABBITMQ_URI
}
