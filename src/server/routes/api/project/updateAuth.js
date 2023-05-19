import db from "../../../sqliteConf"
import {
    authUpdateMessage
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'

function updateAuth(req, res) {
    const {User,Project} = db
    const {userId, authenticationType} = req.body
    const {projectId} = req.params
    // validate user exist or not
    User.findByPk(userId)
        .then(isExistUser => {
            if (isExistUser) {
                Project.update({authenticationType},{where :{_id: projectId}})
                .then(projData => {
                    logger.info(projData)
                    req.responseMessage = authUpdateMessage
                    req.statusCode = 200
                    return responseHandler(req, res)
                })
                .catch(err => {
                    req.statusCode = err.code
                    req.responseMessage = err.message
                    return responseHandler(req, res)
                })
            } else {
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
}

export default updateAuth
