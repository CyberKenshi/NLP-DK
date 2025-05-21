const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const generateToken = require('../utils/generateToken');
const User = require('../models/usersModel');

router.post('/login', login);

module.exports = router;