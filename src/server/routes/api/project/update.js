import db from "../../../sqliteConf"
import {projectExistMessage, projectUpdationSuccessMessage} from '../../../constants/messages'
import responseHandler from '../../../helpers/responseHelper'
import logger from '../../../logger'

function update(req, res) {
  const {User,Project,Mock} = db
  const reqBody = req.body
  const {id} = req.params
  User.findByPk(reqBody.userId)
    .then(isExistUser => {
      Project.update(reqBody, {where :{_id: id}})
        .then(proj => {
          Mock.findAll({where :{projectId: req.params.id}})
            .then(mocks => {
              mocks.forEach((item, index) => {
                const endPoint = `${reqBody.projectName}/${item.endpointRequestPath}`
                Mock.update({endpoint: endPoint, projectName: reqBody.projectName},{where :{_id: item._id}})
                  .then(doc => {
                    logger.info(doc)
                  })
                  .catch(err => {
                    logger.error(err)
                  })
              })
            })
            .catch(err => {
              logger.error(err)
            })
          req.responseMessage = projectUpdationSuccessMessage
          req.statusCode = 201
          return responseHandler(req, res)
        })
        .catch(err => {
          if (err?.fields?.includes('projectName')) {
            req.statusCode = 417
            req.responseMessage = projectExistMessage
            return responseHandler(req, res)
          }
          logger.debug(err)
          return responseHandler(req, res)
        })
    })
    .catch(err => {
      if (err?.fields?.includes('projectName')) {
        req.statusCode = 417
        req.responseMessage = projectExistMessage
        return responseHandler(req, res)
      }

      logger.debug(err)
      return responseHandler(req, res)
    })
}

export default update
