const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Environment variables
const secret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        user.password = req.body.password; // This will trigger the virtual setter
        await user.save();
        res.status(200).json({ message: "User successfully registered" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !user.authenticate(req.body.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = req.body.newPassword; // This will trigger the virtual setter
        await user.save();
        res.status(200).json({ message: "Password successfully changed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add this method to your users controller (app/controllers/users.js)

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Additional controllers for admin functionality can be added here
