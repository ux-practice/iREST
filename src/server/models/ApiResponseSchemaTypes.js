import {modelList} from '../constants/schemaDefaults'

const {Sequelize} = require('sequelize')


module.exports = (sequelize, DataTypes) => {
    const ApiResponseSchemaType = sequelize.define(modelList.API_RESPONSES_SCHEMA_TYPES, {
        _id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        successResponse : {type: DataTypes.STRING, allowNull: false},
        method: {type: DataTypes.STRING, allowNull:false},
        statusCode: {type: DataTypes.STRING}
    }, {
        indexes: [{unique: true, fields: ['_id']}]
    })


    return ApiResponseSchemaType
}
