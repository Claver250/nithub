const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const transferController = require('../controller/transferController');

router.post('/', authenticate, transferController.transferFunds);

module.exports = router;