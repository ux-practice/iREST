import Joi from '@hapi/joi'
import {
  serviceResponseType as serviceResponseTypeList,
  status,
  statusCode,
  dataLimits,
} from '../../constants/schemaDefaults'

const {DEFAULT_SERVICE_RESPONSE, SAVE, EXISTING_API} = serviceResponseTypeList
const {ENABLED, DISABLED} = status
const {statusCode200, statusCode401, statusCode404, statusCode500, statusCode502} = statusCode

const mockCreateValidatorSchema = Joi.object().keys({
  projectId: Joi.string().required(),
  projectName: Joi.string().required().regex(/^[a-z\d\-_\s]+$/i),
  serviceResponseType: Joi.string()
    .allow(DEFAULT_SERVICE_RESPONSE, SAVE, EXISTING_API)
    .required(),
  path: Joi.string().required(),
  endpoint: Joi.string().required().regex(/^[a-z\d\-_$\/&.+! *'()\s]/i),
  statusCode: Joi.allow(statusCode200, statusCode401, statusCode404, statusCode500, statusCode502),
  isDelay: Joi.boolean().required(),
  allowedMethods: Joi.array().items(Joi.string()),
  delaySeconds: Joi.when('isDelay', {
    is: true,
    then: Joi.number()
      .min(0)
      .max(60)
      .required(),
  }),
  contentType: Joi.string().required(),
  mockName: Joi.string().required(),
  mockStatus: Joi.string().valid(ENABLED, DISABLED).required(),
  isDynamicResponse: Joi.boolean().required(),
  isSchema: Joi.when('serviceResponseType', {
    is: DEFAULT_SERVICE_RESPONSE, then: Joi.boolean().required()
  }),
  dynamicResponseKey: Joi.when('isDynamicResponse', {
    is: true,
    then: Joi.string().required(),
  }),
  dynamicResponseRandom: Joi.when('isDynamicResponse', {
    is: true,
    then: Joi.boolean().required(),
  }),
  dynamicResponseSpecific: Joi.when('isDynamicResponse', {
    is: true,
    then: Joi.boolean().required(),
  }),
  dynamicResponseSpecificKeyValue: Joi.when('dynamicResponseSpecific', {
    is: true,
    then: Joi.any().required(),
  }),
  isDynamicImportCount: Joi.when('isDynamicResponse', {
    is: true,
    then: Joi.boolean().required(),
  }),
  dynamicImportCount: Joi.when('isDynamicImportCount', {
    is: true,
    then: Joi.number()
      .min(1)
      .max(dataLimits.nonStreamDataCount)
      .required(),
  }),
  isDynamicImportSize: Joi.when('isDynamicResponse', {
    is: true,
    then: Joi.boolean().required(),
  }),
  dynamicImportSize: Joi.when('isDynamicImportSize', {
    is: true,
    then: Joi.number()
      .min(1)
      .max(dataLimits.nonStreamDataSize)
      .required(),
  }),
  isBulkDataSize: Joi.boolean().required(),
  isBulkDataCount: Joi.boolean().required(),
  bulkDataSize : Joi.when('isBulkDataSize', {
    is: true,
    then: Joi.number()
      .min(1)
      .max(dataLimits.nonStreamDataSize)
      .required(),
  }),
  bulkDataCount : Joi.when('isBulkDataCount', {
    is: true,
    then: Joi.number()
      .min(1)
      .max(dataLimits.nonStreamDataCount)
      .required(),
  })
})

export default mockCreateValidatorSchema
