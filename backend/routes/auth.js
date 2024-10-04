// routes/auth.js
const express = require('express');
const { login, register } = require('../controllers/authController.js');
const router = express.Router();

// @route   POST /api/login
// @desc    Authenticate user & get token
router.post('/login', login);

// @route   POST /api/register
// @desc    Register a new user
router.post('/register', register);

module.exports = router;
