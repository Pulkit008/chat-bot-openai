// config.js
import dotenv from 'dotenv'
dotenv.config()

import { createServer } from "http";
import { Server } from "socket.io";

// Load Path Alias For Transpiled Code [Sync]
import path from 'path'
if (path.extname(__filename) === '.js') {
  require('module-alias/register')
}

// Load the Express App
import '@core/declarations'
import Application from './app'
import Bootstrap from '@core/bootstrap'
import express from 'express'
const expressApp: express.Application = Application.express()
import socketioStandalone from '@standalones/socketio.standalone';

// Execute Bootstrap Code
Bootstrap(Application).then(() => {
  const httpServer = createServer(expressApp);
  const io = new Server(httpServer, { /* options */ });
  io.on("connection", socketioStandalone);

  // Create Server
  httpServer.listen(expressApp.get('port'), () => {
    Application.onServerStart()
  })
})

// Error Handling for uncaught exception
process.on('uncaughtException', (err) => {
  Logger.error('UNCAUGHT EXCEPTION!!! Shutting Down...')
  Logger.error(err)
  process.exit(1)
})

// Error Handling for uncaught rejection
process.on('unhandledRejection', (err) => {
  Logger.error('UNHANDLED REJECTION!!! Shutting Down...')
  Logger.error(err)
  process.exit(1)
})
