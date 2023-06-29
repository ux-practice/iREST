import responseHandler from '../../../helpers/responseHelper'
import {mockListMessage, badRequestMessage} from '../../../constants/messages'
import {serviceResponseType as responseType, mockMethodList} from '../../../constants/schemaDefaults'
import logger from '../../../logger'
import db from "../../../sqliteConf"

const {Op} = require("sequelize")

const {API_BASE_URL, MOCK_BASE_URL} = process.env

function list(req, res) {
  const {Mock} = db
  const {userId} = req.body
  const {
    limit = 10,
    offset = 0,
    existing,
    projectId,
    sortBy,
    order,
    projectName,
    serviceResponseType,
    search,
    all
  } = req.query

  const query = {where : {}}
  
  if (existing && existing === 'true') { // get mock list for existing serviceResponseType
    query.where.serviceResponseType = responseType.SAVE
    query.where.method = mockMethodList.POST
  }

  if (userId) { // get mock for specific user only
    query.where.userId = userId
  }

  if (projectId) { // // filter by projectId
    query.where.projectId = projectId
  }

  if (projectName) { // filter by projectName
    query.where.projectName = projectName
  }

  if (serviceResponseType) { // filter by serviceResponseType
    query.where.serviceResponseType = serviceResponseType
  }

 
  // sorting and pagination
  let options = {}
  query.limit = parseInt(limit, 10)
  query.offset = parseInt(offset, 10)
  if (all === 'true') {
    delete query.limit
    delete query.offset
  }
  
 
  if (sortBy && order) {
    const sort = {[sortBy]: order} // sortBy user params
    options.sort = sort
  } else {
    query.order = [['updatedAt', 'DESC']] // default sort in descending order by document Id
  }

  Mock.count(query).then((totalMocks) => {
    if (totalMocks === 0) {
      req.responseMessage = mockListMessage
      req.statusCode = 200
      req.responseData = {
        mockList: [],
        totalMocks,
      }
      return responseHandler(req, res)
    }

    if (!search) {
      query.attributes = ["_id",
        "projectName" ,
        "projectId" ,
        "endpoint" ,
        "statusCode" ,
        "mockName" ,
        "mockStatus" ,
        "serviceResponseType", 
        "allowedMethods",
        "path",
        "authenticationType"
      ]
      Mock.findAll(query)
        .then(mockList => {
          Array.prototype.forEach.call(mockList, mock => {
            // eslint-disable-next-line no-param-reassign
            mock.endpoint = `${API_BASE_URL}${MOCK_BASE_URL}/${mock.endpoint}`
            // eslint-disable-next-line no-param-reassign
            mock.allowedMethods = JSON.parse(mock.allowedMethods)
          })

          req.responseMessage = mockListMessage
          req.statusCode = 200
          req.responseData = {
            mockList,
            totalMocks,
          }
          return responseHandler(req, res)
        })
        .catch(err => {
          logger.error(err)
          return responseHandler(req, res)
        })
    } else {
      let mockLength
      const searchVal = search?.trim()
      query.where = {[Op.or]:[{projectName:{[Op.like]:`%${searchVal}%`}},{mockName:{[Op.like]:`%${searchVal}%`}}],...query.where}
      options = {
          where:query.where,
          attributes:["_id",
            "projectName" ,
            "projectId" ,
            "endpoint" ,
            "statusCode" ,
            "mockName" ,
            "mockStatus" ,
            "serviceResponseType", 
            "allowedMethods",
            "path",
            "authenticationType"
          ]
        }
       Mock.findAll(options).then(mocks => {
        mockLength= mocks.length
        const mockList = [...mocks]
        Array.prototype.forEach.call(mockList, mock => {
          // eslint-disable-next-line no-param-reassign
          mock.endpoint = `${API_BASE_URL}${MOCK_BASE_URL}/${mock.endpoint}`
          // eslint-disable-next-line no-param-reassign
          mock.allowedMethods = JSON.parse(mock.allowedMethods)
        })
        if ((query.projectName && query.projectName.length>0) || (query.serviceResponseType && query.serviceResponseType.length>0)) {
          mockLength = mockList.length
        }

        req.responseMessage = mockListMessage
          req.statusCode = 200
          req.responseData = {
            mockList,
            totalMocks: mockLength,
          }
          return responseHandler(req, res)
       }).catch(err => {
        logger.error(err)
        return responseHandler(req, res)
       })
    }
  }).catch((err) => {
    logger.error(err)
    req.statusCode = 400
    req.responseMessage = badRequestMessage
    return responseHandler(req, res)
  })
}

export default list
