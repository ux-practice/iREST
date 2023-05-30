import {Builder, parseString} from 'xml2js'
import db from "../../../sqliteConf"
import {
  apiSimulationNoRecordFoundErrorMessage,
  dataStoredSuccessMessage,
  dataUpdatedSuccessMessage,
  dataDeleteSuccessMessage,
  methodNotAllowedErrorMessage,
  badRequestMessage,
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'
/* eslint-disable no-param-reassign */

function saveApiResponseHandler(req, res) {
  if (req.mockData.allowedMethods.includes(req.method)) {
    if (req.method === 'POST') {
      return postApiResponseHandler(req, res)
    }

    if (req.method === 'PUT') {
      return putApiResponseHandler(req, res)
    }

    if (req.method === 'PATCH') {
      return patchApiResponseHandler(req, res)
    }

    if (req.method === 'DELETE') {
      return deleteApiResponseHandler(req, res)
    }

    if (req.method === 'GET') {
      return existingApiResponseHandler(req, res)
    }
  }
  req.statusCode = 405
  req.responseMessage = methodNotAllowedErrorMessage
  return responseHandler(req, res)
}

function postApiResponseHandler(req, res) {
  const dataBody = {}
  dataBody.mockId = req.mockData._id
  const {ApiResponseSchemaTypes} = req.mockData

  if (req.rawBody) {
    logger.debug('rawbody', req.rawBody)
    logger.debug('body', req.body)
  }

  let serviceResponseBody = req.body
  if (
    (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Object) ||
    (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Array)
  ) {
    serviceResponseBody = JSON.stringify(serviceResponseBody)
  }
  dataBody.serviceResponseBody = serviceResponseBody
  dataBody.contentType = req.headers['content-type']
  logger.debug(req.headers['content-type'])
  const {ServiceResponse} = db
  const postId = ApiResponseSchemaTypes.find(e => e.method === "POST")
  let {successResponse} = postId.dataValues
  ServiceResponse.create(dataBody)
    .then(serviceRes => {
      req.responseMessage = dataStoredSuccessMessage
      req.statusCode = req?.mockData?.statusCode
      successResponse = successResponse.replace(`$IREST_RECORD_ID`, serviceRes._id)
      try {
        // eslint-disable-next-line no-unneeded-ternary
        req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
        req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? {
          id: serviceRes._id,
        } : JSON.parse(successResponse)
        return responseHandler(req, res)
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

function putApiResponseHandler(req, res) {
  const {ServiceResponse} = db
  const {ApiResponseSchemaTypes} = req.mockData
  const dataBody = {}
  const _id = req.query.IREST_RECORD_ID

  if (req.rawBody) {
    logger.debug('rawbody', req.rawBody)
    logger.debug('body', req.body)
  }
  const putId = ApiResponseSchemaTypes.find(e => e.method === "PUT")
  let {successResponse} = putId.dataValues
  let serviceResponseBody = req.body
  if (
    (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Object) ||
    (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Array)
  ) {
    serviceResponseBody = JSON.stringify(serviceResponseBody)
  }
  dataBody.serviceResponseBody = serviceResponseBody
  logger.debug(req.headers['content-type'])
  dataBody.contentType = req.headers['content-type']
  // eslint-disable-next-line object-shorthand
  ServiceResponse.update(dataBody,{where :{_id:_id}})
    .then(serviceRes => {
      if (serviceRes === null) {
        logger.info('No Matching Record Found.')
        req.statusCode = 404
        req.responseMessage = apiSimulationNoRecordFoundErrorMessage
        return responseHandler(req, res)
      }
      req.responseMessage = dataUpdatedSuccessMessage
      req.statusCode = req?.mockData?.statusCode

      successResponse = successResponse.replace(`$IREST_RECORD_ID`, _id)
      try {
        // eslint-disable-next-line no-unneeded-ternary
        req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
        req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? {
          id: _id,
        } : JSON.parse(successResponse)
        return responseHandler(req, res)
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

function patchApiResponseHandler(req, res) {
  const {ServiceResponse} = db
  const {ApiResponseSchemaTypes} = req.mockData
  const _id = req.query.IREST_RECORD_ID
  const reqBodyLength = Object.keys(req.body).length

  if (!_id || reqBodyLength <=0) {
    req.statusCode = 400
    req.responseMessage = badRequestMessage
    return responseHandler(req, res)
  }
  const patchId = ApiResponseSchemaTypes.find(e => e.method === "PATCH")
  let {successResponse} = patchId.dataValues
  ServiceResponse.findByPk(_id)
    .then(serviceRes => {
      if (serviceRes === null) {
        logger.info('No Matching Record Found.')
        req.statusCode = 404
        req.responseMessage = apiSimulationNoRecordFoundErrorMessage
        return responseHandler(req, res)
      }

      const dataBody = {}
      let serviceResponseBody = req.body

      if (
        (typeof serviceResponseBody === 'object' && serviceResponseBody.constructor === Object) ||
        (typeof serviceRes.serviceResponseBody === 'object' &&
          serviceRes.serviceResponseBody.constructor === Object)
      ) {
        const inputBody = JSON.parse(serviceRes.serviceResponseBody)
        serviceResponseBody = {...inputBody, ...serviceResponseBody}
        serviceResponseBody = JSON.stringify(serviceResponseBody)
        dataBody.serviceResponseBody = serviceResponseBody
      } else {
        req.responseMessage = badRequestMessage
        req.statusCode = 400
        return responseHandler(req, res)
      }

      logger.info(dataBody)
      // eslint-disable-next-line object-shorthand
      ServiceResponse.update(dataBody, {where :{_id:_id}})
        .then(servRes => {
          if (servRes === null) {
            logger.info('No Matching Record Found.')
            req.statusCode = 404
            req.responseMessage = apiSimulationNoRecordFoundErrorMessage
            return responseHandler(req, res)
          }
          req.responseMessage = dataUpdatedSuccessMessage
          req.statusCode = req?.mockData?.statusCode

          successResponse = successResponse.replace(`$IREST_RECORD_ID`, _id)
          try {
            // eslint-disable-next-line no-unneeded-ternary
            req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
            req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? {
              id: _id,
            } : JSON.parse(successResponse)
            return responseHandler(req, res)
          } catch (error) {
            logger.error(error)
            return responseHandler(req, res)
          }
        })
        .catch(err => {
          logger.error(err)
          return responseHandler(req, res)
        })
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

function deleteApiResponseHandler(req, res) {
  const {ApiResponseSchemaTypes} = req.mockData
  const _id = req.query.IREST_RECORD_ID
  const {ServiceResponse} = db
  const deleteID = ApiResponseSchemaTypes.find(e => e.method === "DELETE")
  let {successResponse} = deleteID.dataValues
  ServiceResponse.destroy({where :{_id}})
    .then(serviceRes => {
      if (serviceRes === null) {
        logger.info('No Matching Record Found.')
        req.statusCode = 404
        req.responseMessage = apiSimulationNoRecordFoundErrorMessage
        return responseHandler(req, res)
      }
      req.responseMessage = dataDeleteSuccessMessage
      req.statusCode = req?.mockData?.statusCode
      successResponse = successResponse.replace(`$IREST_RECORD_ID`, _id)
      try {
        // eslint-disable-next-line no-unneeded-ternary
        req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
        req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? {
          id: _id,
        } : JSON.parse(successResponse)
        return responseHandler(req, res)
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }
    
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}
const builder = new Builder()

function existingApiResponseHandler(req, res) {
  const mockId = req.mockData._id
  const {ApiResponseSchemaTypes} = req.mockData
  const {ServiceResponse} = db
  // eslint-disable-next-line no-prototype-builtins
  if (req.query && req.query.hasOwnProperty('IREST_RECORD_ID')) {
    const _id = req.query.IREST_RECORD_ID
    const getById = ApiResponseSchemaTypes.find(e => e.method === "GET_BY_ID")
    let {successResponse} = getById.dataValues
    ServiceResponse.findByPk(_id)
      .then(serviceRes => {
        if (serviceRes === null) {
          logger.info('No Matching Record Found.')
          req.statusCode = 404
          req.responseMessage = apiSimulationNoRecordFoundErrorMessage
          return responseHandler(req, res)
        }
        req.statusCode = req?.mockData?.statusCode
        req.responseMessage = 'Single Record'
        const IREST_RECORD_ID = serviceRes._id
        let serviceResponseBody
        if (serviceRes.contentType === 'application/json') {
          serviceResponseBody = JSON.parse(serviceRes.serviceResponseBody)
        } else if (serviceRes.contentType === 'application/xml') {
          parseString(serviceRes.serviceResponseBody, (err, result) => {
            serviceResponseBody = builder.buildObject(result)
            logger.debug("xml", serviceResponseBody)
          })
        } else {
          serviceResponseBody = serviceRes.serviceResponseBody
        }
        const record=[]
        const resData = {IREST_RECORD_ID, ...serviceResponseBody}
        record.push(resData)
        successResponse = successResponse.replace(`"$dataObject"`,JSON.stringify(record))
        try {
          // eslint-disable-next-line no-unneeded-ternary
          req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
          req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? record : JSON.parse(successResponse)
          return responseHandler(req, res)
        } catch (error) {
          logger.error(error)
          return responseHandler(req, res)
        }
      })
      .catch(err => {
        logger.error(err)
        return responseHandler(req, res)
      })
  } else {
    const getAllRecords = ApiResponseSchemaTypes.find(e => e.method === "GET")
    let {successResponse} = getAllRecords.dataValues
    ServiceResponse.findAll({where :{mockId}})
      .then(serviceRes => {
        if (serviceRes === null) {
          logger.info('No Matching Record Found.')
          req.statusCode = 404
          req.responseMessage = apiSimulationNoRecordFoundErrorMessage
          return responseHandler(req, res)
        }

        const recordList = []
        Array.prototype.forEach.call(serviceRes, (record) => {
          let serviceResponseBody
          if (record.contentType === 'application/json') {
            serviceResponseBody = JSON.parse(record.serviceResponseBody)
          } else if (record.contentType === 'application/xml') {
            parseString(record.serviceResponseBody, (err, result) => {
              serviceResponseBody = builder.buildObject(result)
              logger.debug("xml", serviceResponseBody)
            })
          } else {
            serviceResponseBody = record.serviceResponseBody
          }
          const IREST_RECORD_ID = record._id
          const updatedRecord = {IREST_RECORD_ID, ...serviceResponseBody}
          recordList.push(updatedRecord)
        })
        successResponse = successResponse.replace(`"$dataArray"`,JSON.stringify(recordList))
        req.statusCode = req?.mockData?.statusCode
        req.responseMessage = 'Record List!'
        try {
          // eslint-disable-next-line no-unneeded-ternary
          req.mockApi = Object.keys(JSON.parse(successResponse)).length === 0 ? false : true
          req.responseData = Object.keys(JSON.parse(successResponse)).length === 0 ? recordList : JSON.parse(successResponse)
          return responseHandler(req, res)
        } catch (error) {
          logger.error(error)
          return responseHandler(req, res)
        }
        
      })
      .catch(err => {
        logger.error(err)
        return responseHandler(req, res)
      })
  }
}

export default saveApiResponseHandler
