const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/api/users', authController.createUser)
router.post('/api/auth/login', authController.loginUser)
router.get('/users', authController.getUsers)

router.get('/api/users/me', authenticate, authController.getProfile);

module.exports = router;