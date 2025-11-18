const express = require('express');
const router =express.Router();
const accountController = require('../controller/accountController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/create',   accountController.createAccount);

router.get('/',   accountController.getAccounts);

router.get('/:accountID', accountController.getAccountsById);

router.get('/:accountID/transactions', accountController.getTransactionByAccount);



module.exports = router;