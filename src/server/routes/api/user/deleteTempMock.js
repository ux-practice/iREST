import db from "../../../sqliteConf"
import logger from '../../../logger'

function deleteTempMock(req, res, next) {
  const {User,TempMock} = db
  const reqBody = req.body

  User.findOne({where : {email: reqBody.email}}).then((usr) => {
    if (usr) {
      TempMock.destroy({where : {userId: usr.id}})
        .then((tempMockList) => {
          logger.info(`this is the total no. of temp mock for user ${reqBody.email}: ${tempMockList.length}`)
        })
        .catch(err => {
          logger.error(err)
        })
    } else {
      logger.debug(`user ${reqBody.email} not found`)
    }
  })
  .catch((err) => {logger.error(err)})
}

export default deleteTempMock
