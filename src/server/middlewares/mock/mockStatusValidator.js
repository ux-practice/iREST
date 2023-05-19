import Joi from '@hapi/joi'
import mockStatusValidatorSchema from '../../validation/mock/status'
import {validationFailureMessage} from '../../constants/messages'
import responseHandler from '../../helpers/responseHelper'

function mockStatusValidator(req, res, next) {
  const {mockStatus} = req.body

  const validationResult = Joi.validate(
    {
      mockStatus,
    },
    mockStatusValidatorSchema
  )


  if (validationResult.error) {
    req.error = validationResult.error
    req.statusCode = 400
    req.responseMessage = validationFailureMessage
    return responseHandler(req, res)
  }
  next()
}

export default mockStatusValidator
