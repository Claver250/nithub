const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT

const sequelize = require('./config/database');

// require('./models')

const app = express();
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transferRoutes = require('./routes/transferRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');

app.use(express.json());

const logger = (req, res, next) => {
    console.log("Request received at", new Date().toLocaleString());
    next();
};

app.use(logger);
// authentication routes
app.use('/api/auth', authRoutes)

// account routes
app.use('/api/accounts', accountRoutes);

app.use('/api/transfer', transferRoutes);

app.use('/api/beneficiaries', beneficiaryRoutes);

app.listen(PORT, async () => {
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