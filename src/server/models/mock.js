import {
    status,
    modelList,
    serviceResponseType,
    statusCode,
    contentEncoding,
    contentTypeList,
    MOCK_TOKEN_AUTEHNTICATION_TYPE
} from '../constants/schemaDefaults'
/* eslint-disable global-require */
const {Sequelize} = require('sequelize')
/* eslint-enable global-require */
const {ENABLED} = status
const {DEFAULT_SERVICE_RESPONSE} = serviceResponseType
const {MOCK_MODEL} = modelList
const {statusCode200} = statusCode
const {DEFAULT_ENCODING} = contentEncoding
const {PLAIN_TEXT} = contentTypeList
const {MOCK_BASE_URL} = process.env
module.exports = (sequelize, DataTypes) => {
    const Mock = sequelize.define(MOCK_MODEL, {
        _id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status: {type: DataTypes.STRING, defaultValue: ENABLED},
        projectName: {type: DataTypes.STRING, allowNull: false},
        serviceResponseType: {type: DataTypes.STRING, defaultValue: DEFAULT_SERVICE_RESPONSE},
        referenceId: {type: Sequelize.UUID, references: {model: "Mocks", key: '_id'}},
        path: {type: DataTypes.STRING, allowNull: false, defaultValue: MOCK_BASE_URL},
        endpoint: {type: DataTypes.STRING, allowNull: false,unique:true},
        endpointRequestPath: {type: DataTypes.STRING, allowNull: false},
        statusCode: {type: DataTypes.STRING, defaultValue: statusCode200},

        isDelay: {type: Sequelize.BOOLEAN, defaultValue: false},
        delaySeconds: {type: Sequelize.INTEGER, validate: {min: 0, max: 60}},

        headers: {type: DataTypes.TEXT}, // [{ key: DataTypes.STRING, value: 'String' }],
        params: {type: DataTypes.TEXT}, // [{ key: DataTypes.STRING, value: 'String' }],

        contentEncoding: {type: DataTypes.STRING, defaultValue: DEFAULT_ENCODING},
        contentType: {type: DataTypes.STRING, defaultValue: PLAIN_TEXT},
        mockName: {type: DataTypes.STRING, allowNull: false,unique:true},
        mockStatus: {type: DataTypes.STRING, defaultValue: ENABLED},
        isDynamicResponse: {type: Sequelize.BOOLEAN, defaultValue: false},
        isSchema: {type: Sequelize.BOOLEAN, defaultValue: false},
        dynamicResponseKey: {type: DataTypes.STRING},
        dynamicResponseRandom: {type: Sequelize.BOOLEAN},
        dynamicResponseSpecific: {type: Sequelize.BOOLEAN},
        dynamicResponseSpecificKeyValue: {type: DataTypes.TEXT},
        isDynamicImportCount: {type: Sequelize.BOOLEAN},
        dynamicImportCount: {type: Sequelize.INTEGER, validate: {min: 0, max: 1000000}},
        isDynamicImportSize: {type: Sequelize.BOOLEAN},
        dynamicImportSize: {type: Sequelize.INTEGER, validate: {min: 0, max: 20480}},
        isBulkDataCount: {type: Sequelize.BOOLEAN},
        bulkDataCount: {type: Sequelize.INTEGER, validate: {min: 0, max: 1000000}},
        isBulkDataSize: {type: Sequelize.BOOLEAN},
        bulkDataSize: {type: Sequelize.INTEGER, validate: {min: 0, max: 20480}},
        allowedMethods: {type: DataTypes.STRING},
        authenticationType: {type: DataTypes.STRING, defaultValue: MOCK_TOKEN_AUTEHNTICATION_TYPE.PROJECT_SPECIFIC},
    }, {
        indexes: [{unique: true, fields: ['_id',"endpoint"]}]
    })
    
    return Mock
}
