import logger from "./logger"

/* eslint-disable global-require */
const {Sequelize, DataTypes} = require('sequelize')

/* eslint-enable global-require */
const sequelize = new Sequelize(
  process.env.IREST_SQLITE_DATABASE,
  process.env.IREST_SQLITE_USERNAME,
  process.env.IREST_SQLITE_PASSWORD,
  {
    host: process.env.IREST_SQLITE_HOST,
    dialect:process.env.IREST_SQLITE_DIALECT /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    storage: process.env.IREST_SQLITE_STORAGE,
    logging: false
  }
)

sequelize
  .authenticate()
  .then(() => {})
  .catch(error => {})

const db = {}
db.sequelize = sequelize
/* eslint-enable global-require */
require("./models/index")(db,sequelize, DataTypes)

db.sequelize.query("PRAGMA foreign_keys = false;")
db.sequelize.sync({force: false,alter:{drop: false}})
    .then((resp) => {

      db.sequelize.query("PRAGMA foreign_keys = true;")
    })
    .catch(error => {logger.error(error)})

export default db