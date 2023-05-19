import Joi from '@hapi/joi'
import mockCreateValidatorSchema from '../../validation/mock/createOrUpdate'
import {validationFailureMessage} from '../../constants/messages'
import responseHandler from '../../helpers/responseHelper'

function mockValidator(req, res, next) {
  const reqBody = req.body

  const validationResult = Joi.validate(
    {
      projectId: reqBody.projectId,
      projectName: reqBody.projectName,
      serviceResponseType: reqBody.serviceResponseType,
      allowedMethods: reqBody.allowedMethods,
      path: reqBody.path,
      endpoint: reqBody.endpoint,
      statusCode: reqBody.statusCode,
      isDelay: reqBody.isDelay,
      delaySeconds: reqBody.delaySeconds,
      contentType: reqBody.contentType,
      mockName: reqBody.mockName,
      mockStatus: reqBody.mockStatus,
      isSchema: reqBody.isSchema,
      isBulkDataSize: reqBody.isBulkDataSize,
      isBulkDataCount: reqBody.isBulkDataCount,
      bulkDataSize: reqBody.bulkDataSize,
      bulkDataCount: reqBody.bulkDataCount,
      isDynamicResponse: reqBody.isDynamicResponse,
      dynamicResponseKey: reqBody.dynamicResponseKey,
      dynamicResponseRandom: reqBody.dynamicResponseRandom,
      dynamicResponseSpecific: reqBody.dynamicResponseSpecific,
      dynamicResponseSpecificKeyValue: reqBody.dynamicResponseSpecificKeyValue,
      isDynamicImportCount: reqBody.isDynamicImportCount,
      dynamicImportCount: reqBody.dynamicImportCount,
      isDynamicImportSize: reqBody.isDynamicImportSize,
      dynamicImportSize: reqBody.dynamicImportSize,
    },
    mockCreateValidatorSchema
  )

  if (validationResult.error) {
    req.error = validationResult.error
    req.statusCode = 400
    req.responseMessage = validationFailureMessage
    return responseHandler(req, res)
  }
  next()
}

export default mockValidator
