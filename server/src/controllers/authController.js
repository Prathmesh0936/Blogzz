const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
};

const register = async (req, res, next) => {
  try {
    handleValidation(req);

    const { username, email, password } = req.body;

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existing) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    const token = generateToken(user);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    handleValidation(req);

    const { identifier, email, password } = req.body;
    const loginIdentifier = identifier || email;

    if (!loginIdentifier) {
      const error = new Error('Email or username is required');
      error.statusCode = 400;
      throw error;
    }

    const query = loginIdentifier.includes('@')
      ? { email: loginIdentifier.toLowerCase() }
      : { username: loginIdentifier };

    const user = await User.findOne(query).select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user);
    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };

