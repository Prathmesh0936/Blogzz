const { body } = require('express-validator');

const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 40 })
    .withMessage('Username must be 3-40 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
  body('identifier').optional().trim().notEmpty().withMessage('Identifier is required'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidator, loginValidator };

