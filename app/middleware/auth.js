const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Environment variables
const secret = process.env.JWT_SECRET;

// Middleware to authenticate and attach user to the request
exports.requireSignin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Authorization token required" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token or token expired" });
    }
};

// Middleware to check if the user is an administrator
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'administrator') {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

// Middleware to check if the user is a customer
exports.isCustomer = (req, res, next) => {
    if (!req.user || req.user.role !== 'customer') {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
