const Sequelize = require('sequelize');

const sequelize = new Sequelize('bank-db', 'postgres', 'Petz125@', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432 
});

module.exports = sequelize;