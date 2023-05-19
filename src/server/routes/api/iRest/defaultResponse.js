import isEmpty from 'lodash/isEmpty'
import responseHandler from '../../../helpers/responseHelper'
import {dataLimits} from '../../../constants/schemaDefaults'
import {countExceedErrorMessage, sizeExceedErrorMessage} from '../../../constants/messages'
import streamlineResponse from './streamlineResponse'
import collectResponse from './collectResponse'
import logger from '../../../logger'
import db from "../../../sqliteConf"

const {faker} = require('@faker-js/faker')

function defaultApiResponseHander(req, res) {
  const {mockData} = req
  const mockId = mockData._id
  const {statusCode} = req.mockData
  const SR = req.isPreview ? db.TempServiceResponse : db.ServiceResponse
  SR.findOne({where: {mockId}})
    .then(serviceResponse => {
      logger.info(serviceResponse)
      if (!isEmpty(serviceResponse.serviceResponseBody)) {
        let response
        try {
          response = JSON.parse(serviceResponse.serviceResponseBody)
        } catch (error) {
          response = serviceResponse.serviceResponseBody
        }
        if (!mockData.isDynamicResponse) {
          if (mockData.isBulkDataCount) {
            if (mockData.bulkDataCount > dataLimits.dataCount) {
              return res.status(500).send(countExceedErrorMessage)
            }

            req.requestData = {
              inputData: Array.isArray(response) ? [...response] : {...response},
              bulkDataCount: mockData.bulkDataCount,
            }

            if (mockData.bulkDataCount <= dataLimits.nonStreamDataCount) {
              return collectResponse(req, res)
            }
            return streamlineResponse(req, res)

          }

          if (mockData.isBulkDataSize) {
            if (mockData.bulkDataSize > dataLimits.dataSize / 1024) {
              return res.status(500).send(sizeExceedErrorMessage)
            }

            req.requestData = {
              inputData: Array.isArray(response) ? [...response] : {...response},
              bulkDataSize: mockData.bulkDataSize,
            }

            if (mockData.bulkDataSize <= (dataLimits.nonStreamDataSize / 1024)) {
              return collectResponse(req, res)
            }
            return streamlineResponse(req, res)
          }
        }

        if (!mockData.isDynamicResponse) {
          if (mockData.isBulkDataCount) {
            if (mockData.bulkDataCount > dataLimits.dataCount) {
              return res.status(500).send(countExceedErrorMessage)
            }

            req.requestData = {
              inputData: Array.isArray(response) ? [...response] : {...response},
              bulkDataCount: mockData.bulkDataCount,
            }

            if (mockData.bulkDataCount <= dataLimits.nonStreamDataCount) {
              return collectResponse(req, res)
            }
            return streamlineResponse(req, res)

          }

          if (mockData.isBulkDataSize) {
            if (mockData.bulkDataSize > dataLimits.dataSize / 1024) {
              return res.status(500).send(sizeExceedErrorMessage)
            }

            req.requestData = {
              inputData:  Array.isArray(response) ? [...response] : {...response},
              bulkDataSize: mockData.bulkDataSize,
            }

            if (mockData.bulkDataSize <= (dataLimits.nonStreamDataSize / 1024)) {
              return collectResponse(req, res)
            }
            return streamlineResponse(req, res)
          }
        }

        if (mockData.isDynamicResponse) {
          if (mockData.dynamicResponseRandom) {
            const {dynamicResponseKey} = mockData

            if (mockData.isDynamicImportCount) {
              if (mockData.dynamicImportCount > dataLimits.dataCount) {
                return res.status(500).send(countExceedErrorMessage)
              }

              req.requestData = {
                inputData:  Array.isArray(response) ? [...response] : {...response},
                dynamicData: JSON.stringify(faker.lorem.sentences()),
                specificKey: dynamicResponseKey,
                dataCount: mockData.dynamicImportCount,
                bulkDataCount: mockData.bulkDataCount,
                bulkDataSize: mockData.bulkDataSize,
              }

              if (mockData.dynamicImportCount <= dataLimits.nonStreamDataCount) {
                return collectResponse(req, res)
              }
              return streamlineResponse(req, res)
            }

            if (mockData.isDynamicImportSize) {
              if (mockData.dynamicImportSize > dataLimits.dataSize / 1024) {
                return res.status(500).send(sizeExceedErrorMessage)
              }

              req.requestData = {
                inputData:  Array.isArray(response) ? [...response] : {...response},
                dynamicData: JSON.stringify(faker.lorem.sentences()),
                specificKey: dynamicResponseKey,
                dataSize: mockData.dynamicImportSize,
                bulkDataSize: mockData.bulkDataSize,
                bulkDataCount: mockData.bulkDataCount,
              }

              if (mockData.dynamicImportSize <= (dataLimits.nonStreamDataSize / 1024)) {
                return collectResponse(req, res)
              }
              return streamlineResponse(req, res)
            }
          }

          if (mockData.dynamicResponseSpecific) {
            const {dynamicResponseKey, dynamicResponseSpecificKeyValue} = mockData
            let specificKeyValue

            try {
              specificKeyValue = JSON.parse(dynamicResponseSpecificKeyValue)
            } catch (error) {
              specificKeyValue = dynamicResponseSpecificKeyValue
            }

            if (mockData.isDynamicImportCount) {
              if (mockData.dynamicImportCount > dataLimits.dataCount) {
                return res.status(500).send(countExceedErrorMessage)
              }

              req.requestData = {
                inputData: Array.isArray(response) ? [...response] : {...response},
                dynamicData: specificKeyValue,
                specificKey: dynamicResponseKey,
                dataCount: mockData.dynamicImportCount,
                bulkDataSize: mockData.bulkDataSize,
                bulkDataCount: mockData.bulkDataCount,
              }

              if (mockData.dynamicImportCount <= dataLimits.nonStreamDataCount) {
                return collectResponse(req, res)
              }
              return streamlineResponse(req, res)
            }
            if (mockData.isDynamicImportSize) {
              if (mockData.dynamicImportSize > dataLimits.dataSize / 1024) {
                return res.status(500).send(sizeExceedErrorMessage)
              }

              req.requestData = {
                inputData: Array.isArray(response) ? [...response] : {...response},
                dynamicData: specificKeyValue,
                specificKey: dynamicResponseKey,
                dataSize: mockData.dynamicImportSize,
                bulkDataSize: mockData.bulkDataSize,
                bulkDataCount: mockData.bulkDataCount,
              }

              if (mockData.dynamicImportSize <= (dataLimits.nonStreamDataSize / 1024)) {
                return collectResponse(req, res)
              }
              return streamlineResponse(req, res)
            }
          }
        }
        return res.status(statusCode).send(response)
      }
      return res.status(204).send()
    })
    .catch(error => {
      logger.error(error)
      return responseHandler(req, res)
    })
}

export default defaultApiResponseHander
