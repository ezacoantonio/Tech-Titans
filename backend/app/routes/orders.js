const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Ensure you have this controller
const authMiddleware = require('../middleware/auth'); // Assuming you have authentication middleware

// Create a new order
router.post('/create', orderController.createOrder);

// Retrieve all orders
router.get('/listorders', orderController.getAllOrders);

// Update an order
router.put('/update/:orderId', orderController.updateOrder);

// Delete an order
router.delete('/delete/:orderId', orderController.deleteOrder);

// View a specific order
router.get('/view/:orderId', orderController.viewOrder);

module.exports = router;
