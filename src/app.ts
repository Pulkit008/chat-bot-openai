import '@core/declarations'
import express, { Request, Response, NextFunction } from 'express'
import { Global } from '@core/globals'
import cors from 'cors'
import helmet from 'helmet'
import morganLogger from 'morgan'
import { AppRoutes } from './app.routes'
import { Database } from '@core/database'

export class Application {
  private app: express.Application

  constructor() {
    this.app = express()
    Global.App.Http.app = this.app
    this.middleware()
    this.config()
    this.connectDatabase()
    this.registerRoutes()
  }

  // Returns Express App
  express(): express.Application {
    return this.app
  }

  // Configuration and Setup
  private config(): void {
    this.app.set('port', App.Config.PORT || 9000)
    this.app.set('env', App.Config.ENVIRONMENT || 'development')
    this.app.disable('x-powered-by')
  }

  // Http(s) request middleware
  private middleware(): void {
    if (App.Config.ENVIRONMENT !== 'test') {
      this.app.use(
        morganLogger('dev', {
          stream: {
            write: (message: string) => Logger.info(message.slice(0, -1)),
          },
        })
      )
    }
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static(__dirname + '/public'))
  }

  // Register Routes
  private async registerRoutes(): Promise<void> {
    this.app.use('/api/v1', AppRoutes)

    this.app.get('/', (_req: Request, res: Response) => {
      return res.sendFile(__dirname + '/public/index.html')
    })

    // Handle the 404 errors
    this.app.use((_req: Request, res: Response) => {
      return res.json({ message: '404 not found!'})
    })
  }

  // Connect Database
  private async connectDatabase(): Promise<void> {
    const database = new Database({
      url: App.Config.DB_CONNECTION_STRING,
      connectionOptions: App.Config.DB_CONNECTION_OPTIONS,
    })
    await database.connect()
    Global.App.Database = database
  }

  // Do things after the server starts
  async onServerStart(): Promise<any> {
    Logger.info(
      `App is running at ${App.Config.HOST} in ${App.Config.ENVIRONMENT} mode.`
    )
    Logger.info('Press CTRL-C to stop')
  }
}

export default new Application()
