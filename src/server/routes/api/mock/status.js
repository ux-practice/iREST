import db from "../../../sqliteConf"
import responseHandler from '../../../helpers/responseHelper'
import {mockStatusChangedMessage, badRequestMessage} from '../../../constants/messages'
import logger from '../../../logger'

function status(req, res) {
  const {Mock} = db
  const {id} = req.params
  const {mockStatus} = req.body

  const options = {}
  options.new = true // default false for original document
  
  Mock.update({mockStatus},{where:{_id:id}})
    .then(mock => {
      logger.info(mock)
      if (mock === null) {
        req.statusCode = 400
        req.responseMessage = badRequestMessage
        return responseHandler(req, res)
      }
      Mock.findByPk(id).then(response => {
        req.responseMessage = mockStatusChangedMessage
        req.statusCode = 200
        req.responseData = {
          mock:response,
        }
        return responseHandler(req, res)
      }).catch(err => {
        logger.error(err)
        return responseHandler(req, res)
      })
      
      
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

export default status
