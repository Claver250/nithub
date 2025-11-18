const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Beneficiary = sequelize.define('Beneficiary', {
    beneficiaryID: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    userID: {               // The user who added this beneficiary
        type: DataTypes.UUID,
        allowNull: false
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

// Associations
Beneficiary.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Beneficiary, { foreignKey: 'userID' });

module.exports = Beneficiary;
