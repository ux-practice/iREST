import bcrypt from "bcryptjs"

import {status,modelList} from '../constants/schemaDefaults'

const {Sequelize} = require('sequelize')

const {ENABLED} = status

const {SALT_ROUND} = process.env
const saltRound = parseInt(SALT_ROUND, 10)
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(modelList.USER_MODEL, {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status: {type: DataTypes.STRING, defaultValue: ENABLED},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false}
    }, {
        indexes: [{unique: true, fields: ['id']}],
        hooks: {
           
            beforeCreate:  (user, options) => {
                return new Promise((resolve, reject) => {
                
                    const {password} = user
                    bcrypt.hash(password, saltRound, (err, data) => {
                        if (err) reject(err)
                         // eslint-disable-next-line func-names
                        user.password = data
                        resolve()
                    })
             
                })
            }
        }
    })

    User.comparePassword = (pwd,hash,cb) => {
        bcrypt.compare(pwd, hash, (err, isMatch) => {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
 
    return User
}
