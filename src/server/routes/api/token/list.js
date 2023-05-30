import db from "../../../sqliteConf"
import responseHandler from '../../../helpers/responseHelper'
import {tokenDetailMessage, noTokenFoundMsg} from '../../../constants/messages'
import logger from '../../../logger'

const url = require('url')

function list(req, res) {
    const {path} = url.parse(req.url)
    const {projectId, mockId} = req.params
    const {Token,Mock} = db

    function getTokenByProjId(id) {
        Token.findOne({where: {projectId:id}})
            .then(tokenDetail => {
                logger.info(tokenDetail)
                if (tokenDetail === null) {
                    req.responseMessage = noTokenFoundMsg
                    req.statusCode = 204
                    return responseHandler(req, res)
                }
                const details = tokenDetail.dataValues
                req.responseMessage = tokenDetailMessage
                req.statusCode = 200
                req.responseData = {
                    ...details,
                }
                return responseHandler(req, res)
            })
            .catch(err => {
                logger.error(err)
                return responseHandler(req, res)
            })
    }

    function getTokenByMockId() {
        Token.findOne({where: {mockId}})
            .then(tokenDetail => {
                logger.info(tokenDetail)
                if (tokenDetail === null) {
                    Mock.findOne({where: {_id:mockId}}).then((mockDetail) => {
                        if (mockDetail !== null) {
                            const projId = mockDetail.projectId
                            getTokenByProjId(projId)
                        }

                    }).catch((err) => {
                        logger.error(err)
                        return responseHandler(req, res)
                    })
                } else {
                    const details = tokenDetail.dataValues
                    req.responseMessage = tokenDetailMessage
                    req.statusCode = 200
                    req.responseData = {
                        ...details,
                    }
                    return responseHandler(req, res)
                }

            })
            .catch(err => {
                logger.error(err)
                return responseHandler(req, res)
            })
    }
    if (path.includes('mockId')) {
        getTokenByMockId()
    }
    else {
        getTokenByProjId(projectId)
    }
}

export default list
