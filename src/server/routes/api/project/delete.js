import responseHandler from '../../../helpers/responseHelper'
import {projectDeleteMessage, projectNotDeleteMessage} from '../../../constants/messages'
import logger from '../../../logger'
import db from "../../../sqliteConf"

function deleteProject(req, res) {
  const {Mock,Project} = db
  Mock.findAll({where :{projectId: req.params.id}})
    .then(mock => {
      logger.debug(mock)
      if (mock.length === 0) {
        db.sequelize.query("PRAGMA foreign_keys = false;")
        Project.destroy({where :{_id:req.params.id}})
          .then(proj => {
            db.sequelize.query("PRAGMA foreign_keys = true;")
            logger.debug(proj)
            req.responseMessage = projectDeleteMessage
            req.statusCode = 202
            return responseHandler(req, res)
          })
          .catch(err => {
            logger.error(err)
            return responseHandler(req, res)
          })
      } else {
        req.responseMessage = projectNotDeleteMessage
        req.statusCode = 412
        return responseHandler(req, res)
      }
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

export default deleteProject
