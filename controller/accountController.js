const { error } = require('console');
const Account = require('../models/account');
const generateUniqueAccountNumber = require('../utils/accountNumberGenerator');
const Transaction = require('../models/transaction');

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
        const userId = req.user.id;

        // Admin sees all account
        const accounts = await Account.findAll({
            where: { userID: userId },
            attributes: ['accountID', 'accountNumber', 'accountType', 'balance', 'createdAt'],
        });

        // if (!accounts.length) {
        //     return res.status(404).json({message: 'No accounts found' });
        // }
    }catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getAccountsByNumber = async (req, res) => {
    try {
        const userId = req.user.id;

        const {accountNumber} = req.params;

        const account = await Account.findOne({
            where: {accountNumber, userID: userId},
            attributes: ['accountID', 'accountNumber', 'accountType', 'balance', 'createdAt']
        });

        if(!account) {
            return res.status(404).json({message: 'Account not found or access denied'});
        }

        res.json({account});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getTransactionByAccount = async (req, res) => {
    try{
        const userId = req.user.id;
        const {accountNumber} = req.params;

        // Ensure account belongs to user
        const account = await Account.findOne({
            where: {accountNumber, userID: userId}
        });

        if(!account){
            return res.status(404).json({ message: 'Account not found'})
        }

        const transactions = await Transaction.findAll({
            where: {accountID: account.accountID},
            attributes: ['transactionID', 'type', 'amount', 'description', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });

        if (!transactions.length){
            return res.status(404).json({message: 'No transaction found'})
        }

        res.json({accountNumber, transactions})
    }catch(err){
        console.error(err);
        res.status(500).json({error: err.message})
    }
};