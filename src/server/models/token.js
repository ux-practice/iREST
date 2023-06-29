import {modelList} from '../constants/schemaDefaults'

const {Sequelize} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(modelList.TOKEN_MODEL, {
        _id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        token: {type: DataTypes.STRING},
    })

    return Token
}
