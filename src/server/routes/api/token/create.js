import db from "../../../sqliteConf"
import logger from '../../../logger'
import generateToken from '../../../helpers/generateUuidToken'

function create(tokenRecord) {
    const dataObj = {...tokenRecord}
    const {Token} = db
    dataObj.token = generateToken()
    Token.create(dataObj).then(data => {
        logger.debug(data)
    }).catch((err) => logger.error(err))
}

export default create
