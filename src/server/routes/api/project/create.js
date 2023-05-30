import db from "../../../sqliteConf"
import responseHandler from '../../../helpers/responseHelper'
import createToken from '../token/create'
import {
  projectExistMessage,
  projectCreationSuccessMessage,
  projectCreationUserNotExistMessage,
} from '../../../constants/messages'
import logger from '../../../logger'

function create(req, res) {
  const {User, Project} = db
  const reqBody = req.body

  reqBody.projectName = reqBody.projectName.replace(/\s/g, '-')

  User.findByPk(reqBody.userId )
    .then(isExistingUser => {
      if (isExistingUser) {
        Project
          .create(reqBody)
          .then(async proj => {
            const options = {}
            options.sort = [ "updatedAt", "DESC" ] // sort in descending order
            const query = {userId: [reqBody.userId]}
            const obj={projectId: proj._id, userId: reqBody.userId}
            // add token to each new project
            await createToken(obj)
            Project.findOne({where : query,order: [options.sort]})
              .then(projectList => {
                req.responseMessage = projectCreationSuccessMessage
                req.statusCode = 201
                req.responseData = {
                  _id: proj._id,
                  projectList,
                }
                return responseHandler(req, res)
              
              })
              .catch(err => {
                logger.error(err)
                return responseHandler(req, res)
              })
          })
          .catch(err => {
          
            if (err?.fields?.includes('projectName')) {
              req.statusCode = 417
              req.responseMessage = projectExistMessage
              return responseHandler(req, res)
            }

            logger.error(err)
            return responseHandler(req, res)
          })
      } else {
        req.statusCode = 400
        req.responseMessage = projectCreationUserNotExistMessage
        logger.error('User not exists')
        return responseHandler(req, res)
      }
    })
    .catch(err => {
      logger.error(err)
      return responseHandler(req, res)
    })
}

export default create
