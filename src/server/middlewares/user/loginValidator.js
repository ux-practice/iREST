import Joi from '@hapi/joi'
import loginValidatorSchema from '../../validation/user/login'
import {validationFailureMessage} from '../../constants/messages'
import responseHandler from '../../helpers/responseHelper'

function loginValidator(req, res, next) {
  const reqBody = req.body

  const validationResult = Joi.validate(
    {email: reqBody.email, password: reqBody.password},
    loginValidatorSchema
  )

  if (validationResult.error) {
    req.error = validationResult.error
    req.statusCode = 400
    req.responseMessage = validationFailureMessage
    return responseHandler(req, res)
  }
  next()
}

export default loginValidator
