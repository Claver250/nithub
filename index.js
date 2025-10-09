const express = require('express');
require('dotenv').config();

const sequelize = require('../nithubproject/config/database');

// require('./models')


const app = express();
const authRoutes = require('./routes/authRoutes')

app.use(express.json());

const logger = (req, res, next) => {
    console.log("Request received at", new Date.toLocaleString());
    next();
};

app.use(logger);
app.use('/api/auth', authRoutes)

app.listen(4000, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Server runs on port https://localhost:4000")
        console.log('Served synched to database')
        console.log('Database and table created')
    }catch(err){
        console.error('Unable to connect')
    }
})