
import responseHandler from '../../../helpers/responseHelper'
import {serviceResponseType} from '../../../constants/schemaDefaults'
import {mockDetailMessage} from '../../../constants/messages'
import logger from '../../../logger'
import db from "../../../sqliteConf"

const {DEFAULT_SERVICE_RESPONSE} = serviceResponseType

function detail(req, res) {
  const {Mock,ServiceResponse,ApiResponseSchemaType} = db
  const {pageNo} = req.query
  const {id} = req.params

  const options = {}
  const mockListPaginationLength = 10

  if (pageNo) {
    options.limit = mockListPaginationLength
    options.skip = (parseInt(pageNo, 10) - 1) * mockListPaginationLength
  }

  Mock.findByPk(id, {include: [{
    model: ServiceResponse,
  },{
    model: ApiResponseSchemaType,
  }]})
    .then(mock => {
      mock.headers = JSON.parse(mock.headers)
      mock.params = JSON.parse(mock.params)
      mock.allowedMethods = JSON.parse(mock.allowedMethods)
      const successResponses = {}
      try {
        mock.ApiResponseSchemaTypes.map(apiResponse => {
          successResponses[apiResponse.method] = JSON.parse(apiResponse.successResponse)
          return apiResponse
        })
        mock.dataValues.ApiResponseSchemaTypes = successResponses
      } catch (error) {
        logger.error(error)
        return responseHandler(req, res)
      }

      // eslint-disable-next-line prefer-destructuring
      if (mock.dataValues.serviceResponseType === DEFAULT_SERVICE_RESPONSE) {
        // eslint-disable-next-line prefer-destructuring
        mock.dataValues.serviceResponse = mock.dataValues.ServiceResponses[0]
        delete mock.dataValues.ServiceResponses
        req.responseMessage = mockDetailMessage
        req.statusCode = 200
        req.responseData = {
          mock
        }
        

      } else {
        
        req.responseMessage = mockDetailMessage
        req.statusCode = 200
        req.responseData = {
          mock
        }
       
      }
      return responseHandler(req, res)
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

export default detail
