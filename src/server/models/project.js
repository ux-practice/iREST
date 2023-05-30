import {status, modelList} from '../constants/schemaDefaults'

const {Sequelize} = require('sequelize')

const {ENABLED} = status

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(modelList.PROJECT_MODEL, {
        _id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status: {type: DataTypes.STRING, defaultValue: ENABLED},
        projectName: {type: DataTypes.STRING, allowNull: false, unique: true},
        count: {type: DataTypes.INTEGER, defaultValue: 0},
        authenticationType: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {
        indexes: [{unique: true, fields: ['_id',"projectName"]}]
    })
    
    return Project
}
