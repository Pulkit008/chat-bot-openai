import { ConfigInterface } from '@config'

const APP_PORT: number = parseInt(process.env.DEV_PORT)
const DOMAIN_NAME: string = process.env.DOMAIN_NAME ?? 'localhost'
const HTTP_PROTOCOL: string = process.env.HTTP_PROTOCOL ?? 'http'

export default (): ConfigInterface => {
  process.env['NODE_ENV'] = 'development'

  return {
    HOST:
      process.env.HOST ??
      `${HTTP_PROTOCOL}://${DOMAIN_NAME}${
        APP_PORT == 80 ? '' : `:${APP_PORT}`
      }`,
    PORT: APP_PORT,
    ENVIRONMENT: process.env['NODE_ENV'],

    DB_CONNECTION_STRING: process.env.DEV_DB_CONNECTION_STRING,
    DB_CONNECTION_OPTIONS: {},

    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  }
}
