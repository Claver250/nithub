const {Sequelize, DataTypes, UUIDV4} = require('sequelize');
const sequelize = require("../config/database");
const User = require('./user');

const Beneficiary = sequelize.define('Beneficiary', {
    beneficiaryID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

Beneficiary.belongsTo(User, {foreignKey: 'userID'});
Beneficiary.hasMany(Beneficiary, {foreignKey: 'userID'});

module.exports = Beneficiary;