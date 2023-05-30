import db from "../../../sqliteConf"
import {
    tokenUpdateMessage,
    tokenDetailMockMessage,
    apiSimulationNoRecordFoundErrorMessage
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'
import {MOCK_TOKEN_AUTEHNTICATION_TYPE} from '../../../constants/schemaDefaults'


const url = require('url')

function update(req, res) {
    const {User,Token, Mock} = db
    const {userId, token} = req.body
    const {path} = url.parse(req.url)
    const {projectId, mockId} = req.params
    // validate user exist or not
    User.findByPk(userId)
        .then(isExistUser => {
            if (isExistUser) {
                if (path.includes('projectId')) {
                    updateToken('projectId', projectId)
                }
                else {
                    findTokenByMockId()
                }
            }
            else {
                req.statusCode = 401
                req.responseMessage = "Unauthorized"
                return responseHandler(req, res)
            }
        })
        .catch(err => {
            logger.debug(err)
            req.statusCode = err.code
            req.responseMessage = err.message
            return responseHandler(req, res)
        })

    function findTokenByMockId() {
        Token.findOne({where: {mockId}})
            .then(tokenDetail => {
                logger.info(tokenDetail)
                if (tokenDetail === null) {
                    const reqBody = {mockId,...req.body}
                    Token.create(reqBody).then(data => {
                        logger.info(data)
                        updateMockAuthType()
                        req.responseMessage = tokenDetailMockMessage
                        req.statusCode = 200
                        req.responseData = data
                        return responseHandler(req, res)
                    }).catch((err) => {logger.error(err)})
                }
                else {
                    updateToken('mockId', mockId)
                }
            })
            .catch(err => {
                logger.error(err)
                return responseHandler(req, res)
            })
    }

    function updateToken(fieldName, id) {
        Token.update({token},{where :{[fieldName]: id}})
            .then(tokenData => {
                if (tokenData===null) {
                req.responseMessage = apiSimulationNoRecordFoundErrorMessage
                req.statusCode = 204
                return responseHandler(req, res)
                }
                if (fieldName==='mockId') {
                    updateMockAuthType()
                }
                req.responseMessage = tokenUpdateMessage
                req.statusCode = 200
                return responseHandler(req, res)
            })
            .catch(err => {
                    req.statusCode = err.code
                    req.responseMessage = err.message
                    return responseHandler(req, res)
            })
    }

    function updateMockAuthType() {
        Mock.update({authenticationType: MOCK_TOKEN_AUTEHNTICATION_TYPE.MOCK_SPECIFIC},{where :{_id: mockId}})
            .then(mockData => {
                logger.info(mockData)
            })
            .catch(err => {
                logger.debug(err)
            })
    }
}

export default update
