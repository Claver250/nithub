const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authController.createUser)
router.post('/login', authController.loginUser)
router.get('/users', authController.getUsers)

router.get('/me', authenticate, authController.getProfile);

module.exports = router;