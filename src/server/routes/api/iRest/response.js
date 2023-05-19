import responseHandler from '../../../helpers/responseHelper'
import {status, serviceResponseType, mockMethodList} from '../../../constants/schemaDefaults'
import {
  apiSimulationNoRecordFoundErrorMessage,
  apiSimulationMockDisabledErrorMessage,
  methodNotAllowedErrorMessage,
} from '../../../constants/messages'
import defaultApiResponseHander from './defaultResponse'
import saveApiResponseHander from './saveResponse'
import logger from '../../../logger'
import db from "../../../sqliteConf"


function apiResponse(req, res) {
  const {Mock,TempMock,ApiResponseSchemaType,TempApiResponseSchemaType} = db
  const {tempId:_id, rapidDoc} = req.query
  let isPreview; let mock; let isRapidDoc
  if (_id) {
    isPreview = true
    req.isPreview = isPreview
    mock = TempMock.findOne({where :{_id},include:[{
      model: TempApiResponseSchemaType,
    }]})
    getApiRes()
  }
  else if (req.method === mockMethodList[req.method] && !_id) {
    
    let {url} = req
    // remove IREST_RECORD_ID from url to search in mock
    if (url.includes("IREST_RECORD_ID")) {
      // eslint-disable-next-line prefer-destructuring
      url = url.split("?")[0]
    }
    // remove RapidDoc  from url to search in mock
    url = url.split("/")
    url.splice(0,1)
    url.splice(0,1)
    url = url.join("/")
    const endpoint = url.replace("&rapidDoc=true","").replace("?rapidDoc=true","")
    isRapidDoc = rapidDoc === 'true'
    req.isRapidDoc = isRapidDoc
    
    /* eslint-disable object-shorthand */
    mock = Mock.findOne({where :{endpoint:endpoint},include:[{
      model: ApiResponseSchemaType,
    }]})
    /* eslint-enable object-shorthand */
    mock.then(mockData => {
    
      // eslint-disable-next-line no-param-reassign
      mockData.allowedMethods = JSON.parse(mockData.allowedMethods)
      if (mockData.allowedMethods.includes(req.method)) {
        getApiRes()
      } else {
        req.statusCode = 405
        req.responseMessage = methodNotAllowedErrorMessage
        return responseHandler(req, res)
      }
    })
  }

  function getApiRes() {
      
    mock.then(mockData => {
      logger.http(mockData)
      // no mock found in db
      if (mockData === null) {
        logger.info('No Matching Mock Found.')
        req.statusCode = 404
        req.responseMessage = apiSimulationNoRecordFoundErrorMessage
        return responseHandler(req, res)
      }

      // if mock method does not match with our
      if (!mockData.allowedMethods.includes(req.method)) {
        req.statusCode = 405
        req.responseMessage = methodNotAllowedErrorMessage
        return responseHandler(req, res)
      }

      // disabled mock handler
      if (!isPreview && (mockData.status === status.DISABLED || mockData.mockStatus === status.DISABLED)) {
        req.statusCode = 404
        req.responseMessage = apiSimulationMockDisabledErrorMessage
        return responseHandler(req, res)
      }

      // adding headers to response
      const headers = {}
      mockData.headers = JSON.parse(mockData.headers)
      
      mockData.headers.forEach(header => {
        headers[header.key] = header.value
      })
      res.header(headers)
      res.header('Content-Type', mockData.contentType)

      // passing mockData to next controllers
      req.mockData = mockData

      // adding delay, if exist
      if (mockData.isDelay) {
        const millisecondsDelay = mockData.delaySeconds * 1000
        return setTimeout(() => {
          controlResponse(req, res,)
        }, millisecondsDelay)
      }
      return controlResponse(req, res)
    })
      .catch(error => {
        logger.error(error)
        return responseHandler(req, res)
      })

  }
}

function controlResponse(req, res) {

  const {mockData} = req
  // Whenever user api's are called we need to send the response send as he/she asked in the response handler file
  req.mockApi = true
  if (mockData.serviceResponseType === serviceResponseType.DEFAULT_SERVICE_RESPONSE) {
    return defaultApiResponseHander(req, res)
  }

  if (mockData.serviceResponseType === serviceResponseType.SAVE) {
    return saveApiResponseHander(req, res)
  }
}

export default apiResponse
