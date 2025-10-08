const { error } = require('console');
const Account = require('../models/account');
const generateUniqueAccountNumber = require('../utils/accountNumberGenerator');

exports.createAccount = async (req, res) => {
    try{
        const{userId, accountType} = req.body;

        const accountNumber = await generateUniqueAccountNumber();

        const account = await Account.create({
            userID: userId,
            accountType,
            accountNumber,
            balance: 0.0
        });

        res.status(201).json({
            message: "Account created successfully",
            data: account,
        })
    }catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getAccounts = async(req, res) => {
    try{
        // Only show accounts for the logged in user
        const userId = req.user?.id;

        // Admin sees all account
        const accounts = await Account.findAll({
            where: { userID: userId },
            attributes: []
        })
    }catch(err){}
}