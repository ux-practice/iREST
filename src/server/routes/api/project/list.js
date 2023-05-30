import db from "../../../sqliteConf"
import responseHandler from '../../../helpers/responseHelper'
import {projectListMessage} from '../../../constants/messages'
import logger from '../../../logger'

const {Op} = require("sequelize")

function list(req, res) {
  const {Project,User} = db
  const {userId} = req.body
  const {pageNo, searchQuery} = req.query
  /* eslint-enable global-require */

  const options = {order: [['updatedAt', 'DESC']]}

  if (userId) {
    options.where = {}
    options.where.userId = [userId]
  }
  if (searchQuery !== undefined) {
    const searchRegex = {[Op.like]:`%${searchQuery}%`}
    options.where = {projectName: searchRegex, ...options.where}
  }
  const projectListPaginationLength = 10
  if (pageNo) {
    options.limit = projectListPaginationLength
    options.skip = (parseInt(pageNo, 10) - 1) * projectListPaginationLength
  }

  options.include = [{
    model: User,
    attributes: ["name", "status"],
    required: true
  }]
  Project.findAll(options).then(projectList => {

    logger.debug(projectList)
    req.responseMessage = projectListMessage
    req.statusCode = 200
    req.responseData = {
      projectList,
    }
    return responseHandler(req, res)
  }).catch(err => {
    logger.error(err)
    return responseHandler(req, res)
  })
}
export default list
