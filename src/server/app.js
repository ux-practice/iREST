/* eslint-disable global-require */
import Express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import winston, {format,transports} from 'winston'
import expressWinston from 'express-winston'
import cors from 'cors'
import path from 'path'
import saslprep from 'saslprep'
import compression from "compression"
import logger from './logger'

if (!saslprep) {
  logger.warn('Warning: no saslprep library specified. Passwords will not be sanitized')
}

// dot env config
const cwd = process.cwd()
const {NODE_ENV} = process.env

let dotEnvConfig
if (NODE_ENV === 'production') {
  dotEnvConfig = require('dotenv').config({path: `${cwd}/.env.prod`})
} else if (NODE_ENV === 'remote') {
  dotEnvConfig = require('dotenv').config({path: `${cwd}/.env.remote.prod`})
} else {
  dotEnvConfig = require('dotenv').config({path: `${cwd}/.env`})
}

const dotEnvExpand = require('dotenv-expand')

dotEnvExpand(dotEnvConfig)

const app = Express()

const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
app.use(compression())

const {printf,combine,timestamp,label,colorize} = format
// express winston acesss logs.before handling the routes.
if (!process.env.NODE_ENV === "production") {
  app.use(
    expressWinston.logger({
      transports: [
        new transports.Console(),
      ],
      format: combine(colorize(), combine(
        colorize({
          all: true,
        }),
        label({
          label: '\n[Access Log]',
        }),
        timestamp({
          format: 'YY-MM-DD HH:MM:SS',
        }),
        printf(
          // eslint-disable-next-line no-shadow
          ({label, timestamp, level, message, ...rest}) => `${label} ${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`
        )
      )),
    })
  )
}

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
// const rawBodySaver = (req, res, buf, encoding) => {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8')
//   }
// }

// app.use(bodyParser.json({verify: rawBodySaver})) // for parsing application/json
// app.use(bodyParser.urlencoded({verify: rawBodySaver, extended: true})) // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.raw({verify: rawBodySaver, type: '*/*'})) // for parsing raw text data

// sqlite conf added
if (NODE_ENV !== 'test') {
  // eslint-disable-next-line global-require
  require("./sqliteConf")
}

// api route config
const {EXPRESS_REST_BASE_URL} = process.env
app.use(EXPRESS_REST_BASE_URL, require('./routes/api'))

if (NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const config = require('../../config/webpack.dev')
  const compiler = webpack(config)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  )
  app.use(webpackHotMiddleware(compiler))
  app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
    res.sendFile('index.html', {root: './public'})
  })
} else {
  // production config without webpack
  app.use(Express.static(process.env.MODULE_DIST_PATH))

  app.get('*', (req, res) => {
    res.sendFile('index.html', {root: process.env.MODULE_DIST_PATH})    
  })
}

// express winston error log
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
  })
)


export default app
