const express = require('express');
const router =express.Router();
const accountController = require('../controller/accountController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate,  accountController.getAccounts);

router.get('/{id}', authenticate, accountController.getAccountsByNumber);

router.get('/{id}/transactions', authenticate, accountController.getTransactionByAccount);



module.exports = router;