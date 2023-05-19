import verifyToken from '../../jwt/verifyToken'
import responseHandler from '../../helpers/responseHelper'
import {jwtMismatchErrorMessage} from '../../constants/messages'

function jwtVerify(req, res, next) {
  function cb(err, decoded) {
    if (err) {
      req.responseMessage = jwtMismatchErrorMessage
      req.statusCode = 401
      return responseHandler(req, res)
    }
    req.body.email = decoded.email
    req.body.userId = decoded._id
    next()
  }

  if (req.headers['x-access-token']) {
    const token = req.headers['x-access-token']
    verifyToken(token, cb)
  } else {
    req.responseMessage = 'No Token Found in Request'
    req.statusCode = 400
    return responseHandler(req, res)
  }
}

export default jwtVerify
