import db from "../../../sqliteConf"
import responseHandler from '../../../helpers/responseHelper'
import {tokenDeleteMessage, badRequestMessage} from '../../../constants/messages'
import logger from '../../../logger'

function deleteProjectToken(req, res) {
    const {Token} = db
    const {projectId} = req.params

    Token.destroy({where:{projectId}})
        .then(record => {
            logger.debug(record)
            if (record === null) {
                req.statusCode = 404
                req.responseMessage = badRequestMessage
                return responseHandler(req, res)
            }

            req.responseMessage = tokenDeleteMessage
            req.statusCode = 202
            return responseHandler(req, res)
        })
        .catch(err => {
            logger.error(err)
            return responseHandler(req, res)
        })
}

export default deleteProjectToken
