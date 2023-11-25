const express = require('express');
const router = express.Router();
const { requireSignin } = require('../middleware/auth');
const { handlePurchase } = require('../controllers/purchaseController');

router.post('/:productId', requireSignin, handlePurchase);

module.exports = router;
