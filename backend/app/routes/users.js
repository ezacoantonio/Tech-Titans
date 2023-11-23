const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authMiddleware = require('../middleware/auth');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Route to get all users
router.get('/listusers', userController.getAllUsers);

// User Profile Update
router.put('/update', userController.updateProfile);

// User Deletion (optional)
router.delete('/delete', userController.deleteUser);

// User Profile Update
router.put('/update/:userId', userController.updateProfile);

// User Profile View
router.get('/profile/:id', userController.viewProfile);

// User Deletion
router.delete('/delete/:userId', userController.deleteUser);

router.get('/balance/:uniqueId', userController.getUserBalance);



// Route to elevate user to admin
router.put('/makeAdmin/:userId', authMiddleware.requireSignin, authMiddleware.isAdmin, userController.makeAdmin);

module.exports = router;
