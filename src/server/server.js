import {Server} from 'http'
import app from './app'
import logger from './logger'

const server = new Server(app)
const port = process.env.PORT || 9000

server.listen(port, err => {
  if (err) {
    return logger.debug(err)
  }
  return logger.info(`Server is running @ port ${port}. Server Directory: ${process.cwd()}`)
})
module.exports = server