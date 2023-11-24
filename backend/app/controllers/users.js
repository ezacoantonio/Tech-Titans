const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Environment variables
const secret = process.env.JWT_SECRET;
//first verion of register function
// exports.register = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         user.password = req.body.password; // This will trigger the virtual setter
//         await user.save();
//         res.status(200).json({ message: "User successfully registered" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.register = async (req, res) => {
    try {
        // Check if the user is trying to set their role to 'administrator'
        if (req.body.role && req.body.role === 'administrator') {
            return res.status(403).json({ message: "Administration privileges are denied" });
        }

        const user = new User(req.body);
        user.password = req.body.password;
        user.uniqueId = uuidv4();
         // This will trigger the virtual setter
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
        const token = jwt.sign({ _id: user._id}, secret, { expiresIn: '1h' });
        const { _id, firstName, lastName, accountBalance } = user;
        res.status(200).json({ token, user: { _id, firstName, lastName, accountBalance } }); // Include token, firstName, lastName, and _id in response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
    }
};

exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Using findById for _id
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Exclude sensitive information like password before sending the user data
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);
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

exports.getUserBalance = async (req, res) => {
    try {
        const user = await User.findOne({ uniqueId: req.params.uniqueId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ balance: user.accountBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Additional controllers for admin functionality can be added here


exports.makeAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, { role: 'administrator' }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User role updated to administrator", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};