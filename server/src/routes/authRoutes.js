const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;

