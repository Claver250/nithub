const {Sequelize, DataTypes, UUIDV4} = require('sequelize');
const sequelize = require("../config/database");
const User = require('./user')

const Account = sequelize.define('Account', {
    accountID : {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    accountType: {
        type: DataTypes.ENUM('savings', 'current'),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    userID: {

        type: DataTypes.UUID,
        allowNull: false,
    },
});

Account.belongsTo(User, { foreignKey: 'userID'});
User.hasMany(Account, { foreignKey: 'userID'});

Account.beforeCreate(async (account, options) => {
    account.accountNumber = await generateUniqueAccountNumber();
});

module.exports = Account;