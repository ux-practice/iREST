import User from './user'
import Project from './project'
import Mock from './mock'
import TempMock from './previewMock'
import ServiceResponse from './serviceResponse'
import TempServiceResponse from './previewServiceResponse'
import Token from './token'
import ApiResponseSchemaType from './ApiResponseSchemaTypes'
import TempApiResponseSchemaType from './previewApiResponseSchemaTypes'

const dbConn = (db, sequelize, DataTypes) => {
    db.User = User(sequelize, DataTypes)
    db.Mock = Mock(sequelize, DataTypes)
    db.TempMock = TempMock(sequelize, DataTypes)
    db.Project = Project(sequelize, DataTypes)
    db.ServiceResponse = ServiceResponse(sequelize, DataTypes)
    db.Token = Token(sequelize, DataTypes)
    db.TempServiceResponse = TempServiceResponse(sequelize, DataTypes)
    db.ApiResponseSchemaType = ApiResponseSchemaType(sequelize, DataTypes)
    db.TempApiResponseSchemaType = TempApiResponseSchemaType(sequelize, DataTypes)

    db.User.hasMany(db.Project, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.Project.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.User.hasMany(db.Mock, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.Project.hasMany(db.Mock, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.Mock.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.Mock.belongsTo(db.Project, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.Mock.hasMany(db.ServiceResponse, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempMock.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.TempMock.belongsTo(db.Project, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'NO ACTION',
    })
    db.TempMock.hasMany(db.TempServiceResponse, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.ServiceResponse.belongsTo(db.Mock, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempServiceResponse.belongsTo(db.TempMock, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })

    db.User.hasMany(db.Token, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade'
    })
    db.Token.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Project.hasMany(db.Token, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Token.belongsTo(db.Project, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Mock.hasMany(db.Token, { 
        foreignKey: 'mockId', 
        foreignKeyConstraint: true, 
        onDelete: 'cascade' 
    })
    db.Token.belongsTo(db.Mock, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })

    db.User.hasMany(db.ApiResponseSchemaType, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.ApiResponseSchemaType.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Project.hasMany(db.ApiResponseSchemaType, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.ApiResponseSchemaType.belongsTo(db.Project, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Mock.hasMany(db.ApiResponseSchemaType, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.ApiResponseSchemaType.belongsTo(db.Mock, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })

    db.User.hasMany(db.TempApiResponseSchemaType, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempApiResponseSchemaType.belongsTo(db.User, {
        foreignKey: 'userId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.Project.hasMany(db.TempApiResponseSchemaType, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempApiResponseSchemaType.belongsTo(db.Project, {
        foreignKey: 'projectId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempMock.hasMany(db.TempApiResponseSchemaType, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })
    db.TempApiResponseSchemaType.belongsTo(db.TempMock, {
        foreignKey: 'mockId',
        foreignKeyConstraint: true,
        onDelete: 'cascade',
    })

    return db
}

module.exports = dbConn
