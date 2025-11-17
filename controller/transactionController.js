// const sequelize = require('../config/database');
// const Account = require('../models/account');
// const Transaction = require('../models/transaction');

// exports.getTransactionByAccount = async (req, res) => {
//     try{
//         const userId = req.user.id;
//         const {accountNumber} = req.params;

//         // Ensure account belongs to user
//         const account = await Account.findOne({
//             where: {accountNumber, userID: userId}
//         });

//         if(!account){
//             return res.status(404).json({ message: 'Account not found'})
//         }

//         const transactions = await Transaction.findAll({
//             where: {accountID: account.accountID},
//             attributes: ['transactionID', 'type', 'amount', 'description', 'createdAt'],
//             order: [['createdAt', 'DESC']],
//         });

//         if (!transactions.length){
//             return res.status(404).json({message: 'No transaction found'})
//         }

//         res.json({accountNumber, transactions})
//     }catch(err){
//         console.error(err);
//         res.status(500).json({error: err.message})
//     }
// };

// exports.transferFunds = async (req, res) => {
//     const { fromAccount, toAccount, amount, description} = req.body;
//     const userId = req.user.id;
//     const t = await sequelize.transaction();

//     try{
//         // Validate accounts
//         const sender = await Account.findOne({where: {accountNumber: fromAccount, userID: userId}
//         });

//         if (!sender) {
//              return res.status(404).json({message: 'Sender account not found'});
//         }

//         const receiver = await Account.findOne({where: {accountNumber: toAccount}}) 

//         if (!receiver) {
//             return res.status(404).json({message: 'Receiver account not found'});
//         }

//         if (fromAccount === toAccount) {
//             return res.status(400).json({message: 'Sender and receiver cannot be the same'});
//         }

//         if (amount <= 100) {
//             return res.status(400).json({message: 'Amount must ge greater than 100'});
//         }

//         if (sender.balance < amount) {
//             return res.status(400).json({message: 'Insufficient funds'});
//         }

//         // Start the transfer
//         sender.balance -= amount;
//         receiver.balance += amount;

//         await sender.save({transaction: t});
//         await receiver.save({transaction: t});

//         const senderTransaction = await Transaction.create({
//             accountID: sender.accountID,
//             type: 'transfer',
//             amount: amount,
//             description: description || `Transfer to ${toAccount}`
//         });

//         const receiverTransaction = await Transaction.create({
//             accountID: receiver.accountID,
//             type: 'transfer',
//             amount: amount,
//             description: description || `Transfer from ${fromAccount}`
//         },{transaction: t});

//         await t.commit();

//         res.status(201).json({
//             message: 'Transfer successful',
//             transaction: {
//                 fromAccount,
//                 toAccount,
//                 amount,
//                 description,
//                 createdAt: senderTransaction.createdAt
//             }
//         });
//     }catch(err){
//         await t.rollback();
//         console.error(err);
//         res.status(500).json({error: err.message})
//     }
// };