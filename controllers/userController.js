const User = require('../models/usersModel.js');
const mongoose = require('mongoose');

// Get all users with role 'personnel'
exports.getAllPersonnelUsers = async (req, res) => {
    try {
        const personnelUsers = await User.find({ role: 'personnel' });
        res.status(200).json({
            status: 'success',
            results: personnelUsers.length,
            data: personnelUsers
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch personnel users.',
            error: error.message
        });
    }
};

// Get details of a specific user by userId
exports.getUserDetail = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user details.',
            error: error.message
        });
    }
};