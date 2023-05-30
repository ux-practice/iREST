import Joi from '@hapi/joi'
import projectValidatorSchema from '../../validation/project/createOrUpdate'
import {validationFailureMessage} from '../../constants/messages'
import responseHandler from '../../helpers/responseHelper'

function projectValidator(req, res, next) {
  const reqBody = req.body

  const validationResult = Joi.validate(
    {
      projectName: reqBody.projectName,
    },
    projectValidatorSchema
  )

  if (validationResult.error) {
    req.error = validationResult.error
    req.statusCode = 400
    req.responseMessage = validationFailureMessage
    return responseHandler(req, res)
  }
  next()
}

export default projectValidator
