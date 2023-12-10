const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const auth = require('../middleware/auth');
const { requireSignin, isCustomer } = require('../middleware/auth');
const { handlePurchase } = require('../controllers/purchaseController');


// POST: Create a new product (Admin only)
router.post('/register', productController.createProduct);

// GET: Retrieve all products
router.get('/listproducts', productController.getAllProducts);

// GET: Retrieve a single product by ID
router.get('/listproduct/:id', productController.getProductById);

// PUT: Update a product (Admin only)
router.put('/update/:id', auth.requireSignin, productController.updateProduct);

// DELETE: Delete a product (Admin only)
router.delete('/delete/:id', auth.requireSignin, productController.deleteProduct);

// GET: Search products
router.get('/search', productController.searchProducts);

// Route to add a question to a product
router.post('/add-question/:productId', productController.addQuestionToProduct);


// POST: Answer a question on a product
router.post('/answer-question/:productId/:questionId', auth.requireSignin, productController.answerQuestion);

router.get('/myproducts', auth.requireSignin, productController.getProductsByOwner);

router.put('/togglestatus/:id', productController.toggleProductStatus);

module.exports = router;
