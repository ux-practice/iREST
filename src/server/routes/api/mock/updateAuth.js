import db from "../../../sqliteConf"
import {
    authUpdateMessage
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'
import {MOCK_TOKEN_AUTEHNTICATION_TYPE} from '../../../constants/schemaDefaults'

function updateAuth(req, res) {
    const {User,Mock,Token} = db
    const {userId, authenticationType} = req.body
    const {mockId} = req.params
    // validate user exist or not
    User.findByPk(userId)
        .then(isExistUser => {
            if (isExistUser) {
                Mock.update({authenticationType},{where :{_id: mockId}})
                .then(mockData => {
                    logger.debug(mockData)
                    if (authenticationType!==MOCK_TOKEN_AUTEHNTICATION_TYPE.MOCK_SPECIFIC) {
                        Token.destroy({where :{mockId}}).then((data)=>{
                            logger.debug(data)
                        })
                    }
                    req.responseMessage = authUpdateMessage
                    req.statusCode = 201
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
