import formidable from 'formidable'
import fs from 'fs'
import os from 'os'
import responseHandler from '../../../helpers/responseHelper'
import {fileTypeMismatchErrorMessage, badRequestMessage} from '../../../constants/messages'
import logger from '../../../logger'

function jsonUploader(req, res) {
  const form = new formidable.IncomingForm()

  form.parse(req)

  form.on('fileBegin', (name, file) => {
    file.path = `${os.tmpdir()}/${file.name}` // eslint-disable-line no-param-reassign
  })

  form.on('file', (name, file) => {
    if (file.type === 'application/json') {
      fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) {
          logger.error(err)
          return responseHandler(req, res)
        }
        const responseJson = {
          message: 'JSON FILE DATA',
          status: 200,
        }
        try {
          responseJson.data = JSON.parse(data)
        } catch (error) {
          logger.error(error)
          req.responseMessage = badRequestMessage
          req.statusCode = 400
          return responseHandler(req, res)
        }
        return res.status(200).send(responseJson)
      })
    } else {
      req.responseMessage = fileTypeMismatchErrorMessage
      req.statusCode = 400
      return responseHandler(req, res)
    }
  })
}

export default jsonUploader
