import Config, { ConfigInterface } from '@config'
import { Logger } from './logger'
import path from 'path'
const config: ConfigInterface = Config()

// Database Models
import { ChatModel } from '@models/chat'

import _ from 'lodash'

// Export Global Variables
export const Global: any = global
Global._ = _
Global.Logger = Logger
Global.App = {
  EXTENSION_ECOSYSTEM: path.extname(__filename) === '.js' ? 'js' : 'ts',
  Http: {
    app: null,
  },
  Config: config,
  Models: {
    Chat: ChatModel,
  },
}
