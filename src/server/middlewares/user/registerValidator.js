import Joi from '@hapi/joi'
import registerValidatorSchema from '../../validation/user/register'
import {validationFailureMessage} from '../../constants/messages'
import responseHandler from '../../helpers/responseHelper'

function registerValidator(req, res, next) {
  const reqBody = req.body

  const validationResult = Joi.validate(
    {email: reqBody.email, password: reqBody.password, name: reqBody.name},
    registerValidatorSchema
  )

  if (validationResult.error) {
    req.error = validationResult.error
    req.statusCode = 400
    req.responseMessage = validationFailureMessage
    return responseHandler(req, res)
  }
  next()
}

export default registerValidator
