import {
  mockupdationSuccessMessage,
  mockCreationUserNotExistMessage,
  mockCreationProjectNotExistMessage,
  mockCreationUniqueEndpointExistMessage,
  invalidDynamicResponseSpecificKeyValueMessage,
  invalidServiceResponseBodyMessage,
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import {serviceResponseType} from '../../../constants/schemaDefaults'
import logger from '../../../logger'
import db from "../../../sqliteConf"

const {API_BASE_URL, MOCK_BASE_URL} = process.env

function update(req, res) {
  const reqBody = req.body
  const {id} = req.params
  const {User,ServiceResponse,Project} = db


  // validate user exist or not
  User.findByPk(reqBody.userId)
    .then(isExistUser => {
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
        if (typeof reqBody.dynamicResponseSpecificKeyValue === 'object' && reqBody.dynamicResponseSpecificKeyValue.constructor === Object
          || (typeof reqBody.dynamicResponseSpecificKeyValue === 'object' && reqBody.dynamicResponseSpecificKeyValue.constructor === Array)) {
          try {
            reqBody.dynamicResponseSpecificKeyValue = JSON.stringify(reqBody.dynamicResponseSpecificKeyValue)
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
      Project.findByPk(reqBody.projectId)
        .then(project => {
          reqBody.endpointRequestPath = reqBody.endpoint
          reqBody.endpoint = `${project.projectName}/${reqBody.endpoint}`
          reqBody.projectName = project.projectName
          if (reqBody.serviceResponseType === DEFAULT_SERVICE_RESPONSE) {
            ServiceResponse.destroy({where :{mockId: id}})
              .then(() => {
                return defaultOptionHandler(req, res)
              })
              .catch(err => {
                req.statusCode = 404
                return responseHandler(req, res)
              })
          } else {
            return saveOptionHandler(req, res)
          }
          

        })
        .catch(err => {
          req.statusCode = 400
          req.responseMessage = mockCreationProjectNotExistMessage
          return responseHandler(req, res)
        })
    })
    .catch(err => {
      req.responseMessage = mockCreationUserNotExistMessage
      req.statusCode = 400
      return responseHandler(req, res)
    })
}
function defaultOptionHandler(req, res) {
  const {Mock,ApiResponseSchemaType} = db
  const reqBody = req.body
  const {id} = req.params
  const {ApiResponseSchemaTypes,statusCode} = reqBody

  reqBody.headers = JSON.stringify(reqBody.headers)
  reqBody.params = JSON.stringify(reqBody.params)
  reqBody.allowedMethods = JSON.stringify(reqBody.allowedMethods)
  const saveMethods = []
  Mock.update(reqBody,{where:{_id: id}})
    .then(mok => {

      try {
        Object.keys(ApiResponseSchemaTypes).forEach(key => {
          saveMethods.push({
              method:key,
              successResponse:JSON.stringify(ApiResponseSchemaTypes[key]),
              statusCode,
              projectId:reqBody?.projectId,
              mockId:id
            })
        })
        
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }
      ApiResponseSchemaType.destroy({where:{mockId:id}}).then(resp => {
        ApiResponseSchemaType.bulkCreate(saveMethods)
        // pick reference id from request body
        reqBody.mockId = id

        req.mok = mok
        return storeServiceResponse(req, res)
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

function saveOptionHandler(req, res) {
  const reqBody = req.body
  const {id} = req.params
  const {Mock,ApiResponseSchemaType} = db

  reqBody.headers = JSON.stringify(reqBody.headers)
  reqBody.params = JSON.stringify(reqBody.params)
  reqBody.allowedMethods = JSON.stringify(reqBody.allowedMethods)
  const {ApiResponseSchemaTypes,statusCode} = reqBody
  const saveMethods = []
 
  Mock.update(reqBody, {where :{_id: id}})
    .then(mok => {
      req.responseMessage = mockupdationSuccessMessage
      req.statusCode = 200
      try {
        Object.keys(ApiResponseSchemaTypes).forEach(key => {
          saveMethods.push({
            method:key,
            successResponse:JSON.stringify(ApiResponseSchemaTypes[key]),
            statusCode,
            projectId:reqBody?.projectId,
            mockId:id
          })
        })
        ApiResponseSchemaType.destroy({where:{mockId:id}})
        ApiResponseSchemaType.bulkCreate(saveMethods)
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }

      req.responseData = {
        // eslint-disable-next-line object-shorthand
        id: id,
        mockName: reqBody.mockName,
        mockUrl: `${API_BASE_URL}${MOCK_BASE_URL}/${reqBody.endpoint}`,
        allowedMethods: JSON.parse(reqBody.allowedMethods),
      }
      return responseHandler(req, res)
    })
    .catch(err => {
      if (err?.fields?.includes('endpoint')) {
        req.statusCode = 417
        req.responseMessage = mockCreationUniqueEndpointExistMessage
        return responseHandler(req, res)
      }

      logger.debug(err)
      return responseHandler(req, res)
    })
}

function storeServiceResponse(req, res) {
  const {ServiceResponse} = db
  const reqBody = req.body
 
  ServiceResponse
    .create(reqBody)
    .then(() => {
      req.responseMessage = mockupdationSuccessMessage
      req.statusCode = 200

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

export default update
