import {Server} from 'http'
import ChildProcess from 'child_process'
import app from './app'
import logger from './logger'


const server = new Server(app)
const port = process.env.PORT || 9000
const {NODE_ENV} = process.env

server.on('error', async (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use!`)
  }
  
})

server.listen(port, err => {
  if (err) {
    return logger.debug(err)
  }
  if (NODE_ENV === "production") {
    const start = (process.platform === 'darwin'? 'open': process.platform === 'win32'? 'start': 'xdg-open')
    ChildProcess.exec(`${start} http://localhost:${port}`)
  }
  return logger.http(`iRest Server is listening on localhost:${port}, open your browser on http://localhost:${port}`)
})
module.exports = server