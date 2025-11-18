const sequelize = require('../config/database');
const Account = require('../models/account');
const Transaction = require('../models/transaction');  // IMPORTANT
const Transfer = require('../models/transfer');        // If needed

exports.transferFunds = async (req, res) => {
    const { senderAccount, receiverAccount, amount, description } = req.body;
    const userId = req.user.id;

    if (!senderAccount || !receiverAccount || !amount) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const t = await sequelize.transaction();

    try {
        // Validate sender
        const sender = await Account.findOne({
            where: { accountNumber: senderAccount, userID: userId }
        });

        if (!sender) {
            return res.status(404).json({ message: 'Sender account not found' });
        }

        // Validate receiver
        const receiver = await Account.findOne({
            where: { accountNumber: receiverAccount }
        });

        if (!receiver) {
            return res.status(404).json({ message: 'Receiver account not found' });
        }

        if (senderAccount === receiverAccount) {
            return res.status(400).json({ message: 'Sender and receiver cannot be the same' });
        }

        if (amount <= 100) {
            return res.status(400).json({ message: 'Amount must be greater than 100' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Adjust balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ transaction: t });
        await receiver.save({ transaction: t });

        // Sender transaction
        const senderTransaction = await Transaction.create({
            accountID: sender.accountID,
            type: 'transfer',
            amount,
            description: description || `Transfer to ${receiverAccount}`
        }, { transaction: t });

        // Receiver transaction
        const receiverTransaction = await Transaction.create({
            accountID: receiver.accountID,
            type: 'transfer',
            amount,
            description: description || `Transfer from ${senderAccount}`
        }, { transaction: t });

        // Commit transaction
        await t.commit();

        res.status(201).json({
            message: 'Transfer successful',
            transaction: {
                senderAccount,
                receiverAccount,
                amount,
                description,
                createdAt: senderTransaction.createdAt
            }
        });

    } catch (err) {
        await t.rollback();
        console.error(err);
        res.status(500).json({
            message: 'Transfer failed',
            error: err.message
        });
    }
};
