const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const beneficiaryController = require('../controller/beneficiaryController');

router.post('/', authenticate, beneficiaryController.addBeneficiary);

router.get('/', authenticate, beneficiaryController.getBeneficiary);

router.delete('/:id', authenticate, beneficiaryController.deleteBeneficiary);

module.exports = router;