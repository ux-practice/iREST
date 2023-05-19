import responseHandler from '../../../helpers/responseHelper'
import {mockDeleteMessage, badRequestMessage} from '../../../constants/messages'
import logger from '../../../logger'
import db from "../../../sqliteConf"

function deleteMock(req, res) {
  const {Mock,Project} = db
  Mock.findByPk(req.params.id).then(mock => {
    Mock.destroy({where :{_id:req.params.id}})
    .then(deletedMock => {
      logger.info(mock)
      if (mock === null) {
        req.statusCode = 400
        req.responseMessage = badRequestMessage
        return responseHandler(req, res)
      }
      
      Project.increment({count:-1},{where :{projectName: mock.projectName}})
        .then(result => {
          logger.debug(result)
          if (result) {

            req.responseMessage = mockDeleteMessage
            req.statusCode = 202
            return responseHandler(req, res)
          }
        })
        .catch(err => {
          logger.error(err)
          return responseHandler(req, res)
        })      
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
  }).catch(err => {
    logger.error(err)
    return responseHandler(req, res)
  })
  
}

export default deleteMock
