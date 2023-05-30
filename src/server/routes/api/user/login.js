
import {
  passwordMismatchErrorMessage,
  emailNotFoundErrorMessage,
  userLoginSuccessMessage,
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'
import deleteTempMock from './deleteTempMock'
import db from "../../../sqliteConf"

function login(req, res, next) {

  const {User} = db
  const reqBody = req.body
  User.findOne({
    where: {
      email: reqBody.email
    }
  }).then(usr => {
    User.comparePassword(reqBody.password, usr.password, (error, isMatched) => {
      if (error || !isMatched) {
        req.responseMessage = passwordMismatchErrorMessage
        req.statusCode = 401
        return responseHandler(req, res, next)
      }

      req.responseMessage = userLoginSuccessMessage
      req.statusCode = 200
      req.responseData = {
        email: usr.email,
        name: usr.name,
        _id: usr.id,
      }

      // handle deletion of temp mock on finish
      res.on('finish', (err) => {
        if (err) {
          logger.debug(`Error, skipping the deletion temp mock for user: ${usr.email}`)
        } else {
          deleteTempMock(req, res, next)
        }
      })
      next()
    })
  }).catch(err => {
    req.responseMessage = emailNotFoundErrorMessage
    req.statusCode = 400
    return responseHandler(req, res)
  })
}

export default login