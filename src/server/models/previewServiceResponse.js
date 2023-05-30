import {status,modelList} from '../constants/schemaDefaults'

const {Sequelize} = require('sequelize')

const {ENABLED} = status

module.exports = (sequelize, DataTypes) => {
    const TempServiceResponse = sequelize.define(modelList.PREVIEW_SERVICE_RESPONSE_MODEL, {
        _id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status: {type: DataTypes.STRING, defaultValue: ENABLED},
   

        serviceResponseBody: {type: DataTypes.STRING, allowNull: false},
        contentType: {type: DataTypes.STRING, allowNull: false},
    }, {
        indexes: [{unique: true, fields: ['_id']}]
    })
    
    return TempServiceResponse
}
