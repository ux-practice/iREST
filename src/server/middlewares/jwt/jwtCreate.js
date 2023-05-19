import createToken from '../../jwt/createToken'
import responseHandler from '../../helpers/responseHelper'
import logger from '../../logger'

function jwtCreate(req, res, next) {
  function cb(err, token) {
    if (err) {
      logger.error(err)
      return responseHandler(req, res)
    }
    res.header({"x-access-token": token})
    return responseHandler(req, res)
  }

  createToken({
    email: req.body.email,
    _id: req.responseData._id
  }, cb)
}

export default jwtCreate
