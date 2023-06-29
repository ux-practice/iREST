import {
  mockCreationSuccessMessage,
  mockCreationUserNotExistMessage,
  mockCreationUniqueEndpointExistMessage,
  invalidServiceResponseBodyMessage,
  invalidDynamicResponseSpecificKeyValueMessage,
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import {serviceResponseType} from '../../../constants/schemaDefaults'
import logger from '../../../logger'
import db from "../../../sqliteConf"

const {API_BASE_URL, MOCK_BASE_URL} = process.env

function create(req, res) {
  const {User,Project} = db
  const reqBody = req.body
  const {isPreview} = req.query
  // validate user exist or not
  User.findByPk(reqBody.userId)
    .then(isExistUser => {
      if (isExistUser) {
        reqBody.path = MOCK_BASE_URL

        const {EXISTING_API, DEFAULT_SERVICE_RESPONSE} = serviceResponseType

        // handle existing api for POST CREATION CALL
        // service response will be saved when user hits the rest call
        if (reqBody.serviceResponseType !== EXISTING_API) {
          delete reqBody.referenceId
        }

        // remove delayKey if delay is false
        if (!reqBody.isDelay) {
          delete reqBody.delaySeconds
        }

        // dynamic response extra key removal before insert into the DB
        // start point
        if (!reqBody.isDynamicResponse) {
          delete reqBody.dynamicResponseKey
          delete reqBody.dynamicResponseRandom
          delete reqBody.dynamicResponseSpecific
          delete reqBody.dynamicResponseSpecificKeyValue
          delete reqBody.isDynamicImportCount
          delete reqBody.dynamicImportCount
          delete reqBody.isDynamicImportSize
          delete reqBody.dynamicImportSize
        }

        if (reqBody.isDynamicResponse && reqBody.dynamicResponseRandom) {
          delete reqBody.dynamicResponseSpecific
          delete reqBody.dynamicResponseSpecificKeyValue
        }

        if (reqBody.isDynamicResponse && reqBody.dynamicResponseSpecific) {
          delete reqBody.dynamicResponseRandom

          // stringify object/array body
          if (
            (typeof reqBody.dynamicResponseSpecificKeyValue === 'object' &&
              reqBody.dynamicResponseSpecificKeyValue.constructor === Object) ||
            (typeof reqBody.dynamicResponseSpecificKeyValue === 'object' &&
              reqBody.dynamicResponseSpecificKeyValue.constructor === Array)
          ) {
            try {
              reqBody.dynamicResponseSpecificKeyValue = JSON.stringify(
                reqBody.dynamicResponseSpecificKeyValue
              )
            } catch (error) {
              req.statusCode = 400
              req.responseMessage = invalidDynamicResponseSpecificKeyValueMessage
              return responseHandler(req, res)
            }
          }
        }

        if (reqBody.isDynamicResponse && reqBody.isDynamicImportCount) {
          delete reqBody.isDynamicImportSize
          delete reqBody.dynamicImportSize
        }

        if (reqBody.isDynamicResponse && reqBody.isDynamicImportSize) {
          delete reqBody.isDynamicImportCount
          delete reqBody.dynamicImportCount
        }

        if (reqBody.isBulkDataCount) {
          delete reqBody.isBulkDataSize
          delete reqBody.bulkDataSize
        }

        if (reqBody.isBulkDataSize) {
          delete reqBody.isBulkDataCount
          delete reqBody.bulkDataCount
        }
        // dynamic response extra key removal before insert into the DB
        // end point

        // manually validate the json body and convert into string before save
        let {serviceResponseBody} = reqBody

        if (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Object) {
          try {
            serviceResponseBody = JSON.stringify(serviceResponseBody)
            reqBody.serviceResponseBody = serviceResponseBody
          } catch (error) {
            req.statusCode = 400
            req.responseMessage = invalidServiceResponseBodyMessage
            return responseHandler(req, res)
          }
        }
        Project.increment({count: isPreview ? 0 : +1},{where :{_id: reqBody.projectId}}).then(project => {
          logger.debug(project)
          if (project) {
            reqBody.endpointRequestPath = reqBody.endpoint
            reqBody.endpoint = `${reqBody.projectName}/${reqBody.endpoint}`
            reqBody.headers = JSON.stringify(reqBody.headers)
            reqBody.params = JSON.stringify(reqBody.params)
          
            if (reqBody.serviceResponseType === DEFAULT_SERVICE_RESPONSE) {
              return defaultOptionHandler(req, res, isPreview)
            }
            return saveOptionHandler(req, res, isPreview)
          }
          req.statusCode = 204
          return responseHandler(req, res)
        })
      } else {
        req.responseMessage = mockCreationUserNotExistMessage
        req.statusCode = 400
        return responseHandler(req, res)
      }
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

function saveOptionHandler(req, res, isPreview) {
  const reqBody = req.body
  const Mock = isPreview ? db.TempMock : db.Mock
  const ApiResponseType = isPreview ? db.TempApiResponseSchemaType : db.ApiResponseSchemaType
  const {ApiResponseSchemaTypes,statusCode} = reqBody
  const saveMethods = []
  

 
  reqBody.allowedMethods = JSON.stringify(reqBody.allowedMethods)
  Mock.create(reqBody).then(mok => {
    try {
      Object.keys(ApiResponseSchemaTypes).forEach(key => {
        saveMethods.push({
          method:key,
          successResponse:JSON.stringify(ApiResponseSchemaTypes[key]),
          statusCode,
          projectId:reqBody?.projectId,
          mockId:mok._id
        })
      })
    } catch (error) {
      logger.error(error)
      return responseHandler(req, res)
    }

    ApiResponseType.bulkCreate(saveMethods).then(apiRes => {
      req.responseMessage = mockCreationSuccessMessage
      req.statusCode = 201
      req.responseData = {
        id: mok._id,
        mockName: mok.mockName,
        allowedMethods: mok.allowedMethods,
        mockUrl: `${API_BASE_URL}${MOCK_BASE_URL}/${mok.endpoint}`,
      }
      return responseHandler(req, res)
    }).catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
   
  })
  .catch(err => {
    if (err?.fields?.includes('endpoint')) {
      req.statusCode = 417
      req.responseMessage = mockCreationUniqueEndpointExistMessage
      return responseHandler(req, res)
    }
    logger.error(err)
    return responseHandler(req, res)
  })
}

// serviceResponseType === "default"
function defaultOptionHandler(req, res, isPreview) {
  const Mock = isPreview ? db.TempMock: db.Mock
  const ApiResponseType = isPreview ? db.TempApiResponseSchemaType : db.ApiResponseSchemaType
  const reqBody = req.body
  const {ApiResponseSchemaTypes,statusCode} = reqBody
  const saveMethods = []

  reqBody.allowedMethods = JSON.stringify(reqBody.allowedMethods)

  Mock.create(reqBody).then(mok => {
    try {
      Object.keys(ApiResponseSchemaTypes).forEach(key => {
        saveMethods.push({
          method:key,
          successResponse:JSON.stringify(ApiResponseSchemaTypes[key] === "" ? {} : ApiResponseSchemaTypes[key]),
          statusCode,
          projectId:reqBody?.projectId,
          mockId:mok._id
        })
      })
    } catch (error) {
      logger.error(error)
      return responseHandler(req, res)
    }
    ApiResponseType.bulkCreate(saveMethods).then(apiRes => {
      req.mok = mok
      return storeServiceResponse(req, res, isPreview)
    }).catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
    
  })
  .catch(err => {
    if (err?.fields?.includes('endpoint')) {
      req.statusCode = 417
      req.responseMessage = mockCreationUniqueEndpointExistMessage
      return responseHandler(req, res)
    }

    logger.error(err)
    return responseHandler(req, res)
  })
}

function storeServiceResponse(req, res, isPreview) {

  const reqBody = req.body
  reqBody.mockId = req.mok._id
  const ServiceResponse = isPreview ? db.TempServiceResponse : db.ServiceResponse

  ServiceResponse
    .create(reqBody)
    .then(() => {
      req.responseMessage = mockCreationSuccessMessage
      req.statusCode = 201

      const {mok} = req
      req.responseData = {
        id: mok._id,
        mockName: mok.mockName,
        mockUrl: `${API_BASE_URL}${MOCK_BASE_URL}/${mok.endpoint}`,
        allowedMethods: mok.allowedMethods,
      }
      return responseHandler(req, res)
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

export default create
