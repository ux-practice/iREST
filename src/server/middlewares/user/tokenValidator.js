import {parse} from 'url'
import responseHandler from '../../helpers/responseHelper'
import db from "../../sqliteConf"
import logger from '../../logger'
import {
  apiSimulationNoRecordFoundErrorMessage,
} from '../../constants/messages'
import {iRestAuthToken, MOCK_TOKEN_AUTEHNTICATION_TYPE} from '../../constants/schemaDefaults'
import {parseCookies, parseUrl} from '../../helpers/util'

const handleUnauthorizeResponse =(req, res)=>{
  req.statusCode = 401
  req.responseMessage = "Bad request"
  return responseHandler(req, res)
}

const checkProjBasedAuth = (req, res, next) =>{
  const {Token, Project} = db
  const {mockData, token} = req
  Project.findByPk(mockData.projectId)
  .then((projData) => {
    logger.debug(projData)
    if (projData.authenticationType) {
      Token.findOne({where: {projectId: mockData.projectId}})
        .then((tokenData) => {
          if (tokenData.token === token) {
            next()
          }
          else {
            return handleUnauthorizeResponse(req, res)
          }
        })
        .catch((err) => {
          logger.err(err)
        })
    }
    else {
      next()
    }
  })
  .catch((err) => {
    logger.error(err)
  })
}

function tokenValidator(req, res, next) {
  const isRapidDoc = req?.query?.rapidDoc
  const {MOCK_BASE_URL} = process.env
  if (isRapidDoc) {
    next()
  } else {
    const {Mock, Token} = db
    const {pathname,search} = parse(req?.url)
    const query = parseUrl(search)
    const endPoint = pathname.replace(`${MOCK_BASE_URL}/`, '') + query
    const cookieObj = parseCookies(req)
    const checkTokenKey = (Object.prototype.hasOwnProperty.call(req.headers, iRestAuthToken.toLowerCase()) || Object.prototype.hasOwnProperty.call(req.query, iRestAuthToken) || req.headers?.cookie?.includes(iRestAuthToken))
    let token = req.query[iRestAuthToken] || req.headers[iRestAuthToken.toLowerCase()]
    if (Object.prototype.hasOwnProperty.call(cookieObj, iRestAuthToken)) {
      token= cookieObj[iRestAuthToken]
    }
    if (checkTokenKey && token === undefined) {
      token = ""
    }
    Mock.findOne({where: {endpoint: endPoint}}).then((mockData) => {
      if (mockData === null) {
        req.statusCode = 404
        req.responseMessage = apiSimulationNoRecordFoundErrorMessage
        return responseHandler(req, res)
      }
      const authType = mockData.authenticationType
      if (authType === MOCK_TOKEN_AUTEHNTICATION_TYPE.OFF) {
        next()
      } else if (authType === MOCK_TOKEN_AUTEHNTICATION_TYPE.MOCK_SPECIFIC) {
        if (!checkTokenKey) {
          return handleUnauthorizeResponse(req, res)
        }
        Token.findOne({where: {token,mockId:mockData._id}}).then((tokenData) => {
          if (!tokenData) {
            return handleUnauthorizeResponse(req, res)
          }
          if (tokenData.mockId && tokenData.token === token && tokenData?.mockId?.toString() === mockData._id.toString()) {
            next()
          }
          else {
            return handleUnauthorizeResponse(req, res)
          }
        }).catch((err) => {
          logger.error(err)
        }
        )
      } else {
        req.mockData = mockData
        req.token = token
        return checkProjBasedAuth(req, res, next)
      }
    }).catch((err) => { logger.error(err) })
  }
}

export default tokenValidator
