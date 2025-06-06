const User = require('../models/usersModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validate input
        if (!identifier || !password) {
            return res.status(400).json({ message: 'Please provide both identifier (email or username) and password' });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
        }

        // Check if account is locked
        if (user.isLocked) {
            return res.status(403).json({ message: 'Account is locked. Please contact an administrator' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Prepare user data for response
        const userData = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        // Send response
        res.status(200).json({
            message: 'Login successful',
            user: userData,
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later' });
    }
};

module.exports = { login };