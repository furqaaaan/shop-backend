const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');

// @route   POST api/auth
// @desc    Login user
// @access  public
router.post(
  '/',
  [
    check('email', 'please inclue valid email').isEmail(),
    check('password', 'please enter password.').exists(),
  ],
  authController.login
);

module.exports = router;
