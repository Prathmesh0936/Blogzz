const { body } = require('express-validator');

const urlRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;

const createPostValidator = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('Title must be between 5 and 120 characters'),
  body('content')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('imageURL')
    .optional({ checkFalsy: true })
    .custom((value) => urlRegex.test(value))
    .withMessage('Image URL must be a valid URL'),
];

const updatePostValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('Title must be between 5 and 120 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('imageURL')
    .optional({ checkFalsy: true })
    .custom((value) => urlRegex.test(value))
    .withMessage('Image URL must be a valid URL'),
];

module.exports = { createPostValidator, updatePostValidator };

