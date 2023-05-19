import {
  userExistMessage,
  userCreationSuccessMessage,
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import {status} from '../../../constants/schemaDefaults'
import logger from '../../../logger'
import db from "../../../sqliteConf"

export default function register(req, res) {
  const {User} = db
  const reqBody = req.body
  const {ENABLED} = status
  reqBody.status = ENABLED
  User.create(reqBody).then(usr => {
    req.responseMessage = userCreationSuccessMessage
    req.statusCode = 201
    req.responseData = {
      email: usr.email,
      _id: usr.id,
    }
    return responseHandler(req, res)
  }).catch(err => {
    if (err.name === "SequelizeUniqueConstraintError") {
      req.statusCode = 417
      req.responseMessage = userExistMessage
      return responseHandler(req, res)
    }

    logger.error(err)
    return responseHandler(req, res)
  })

}
