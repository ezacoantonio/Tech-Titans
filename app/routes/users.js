const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authMiddleware = require('../middleware/auth');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// User Profile Update
router.put('/update', userController.updateProfile);

// User Deletion (optional)
router.delete('/delete', userController.deleteUser);

// User Profile Update
router.put('/update/:userId', userController.updateProfile);

// User Profile View
router.get('/profile/:userId', userController.viewProfile);

// User Deletion
router.delete('/delete/:userId', userController.deleteUser);

// Route to elevate user to admin
router.put('/makeAdmin/:userId', authMiddleware.requireSignin, authMiddleware.isAdmin, userController.makeAdmin);

module.exports = router;
