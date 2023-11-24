import '@core/declarations'
import { FileExistsSync } from './utils'

export interface ConfigInterface {
  HOST: string
  PORT: number
  ENVIRONMENT: string

  DB_CONNECTION_STRING: string
  DB_CONNECTION_OPTIONS: any

  OPEN_AI_API_KEY: string
}

export default (): ConfigInterface => {
  const { NODE_ENV = 'development' } = process.env
  const environment = NODE_ENV?.toLowerCase()
  const environmentFileLocation = `${__dirname}/../environments`
  const environmentFilePath = `${environmentFileLocation}/${environment}`
  if (FileExistsSync(environmentFilePath)) {
    // eslint-disable-next-line
    const configuration: ConfigInterface = (require(environmentFilePath).default)()
    return configuration
  } else {
    throw Error(`Missing environment file for NODE_ENV=${environment}.`)
  }
}
