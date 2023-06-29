import {
  sessionUpdateMessage
} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'

function updateSession(req, res) {
    req.responseMessage = sessionUpdateMessage
    req.statusCode = 200
    return responseHandler(req, res)
}

export default updateSession
