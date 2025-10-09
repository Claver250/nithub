const {Sequelize, DataTypes, UUIDV4} = require('sequelize');
const sequelize = require("../config/database");
const { timeStamp } = require('node:console');

const User =sequelize.define ('User', {
    userID : {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Joe Doe'
    },
    
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Janedoe@gmail.com',
        unique : true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
{
    timeStamps: true,
});

module.exports = User;