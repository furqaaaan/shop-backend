const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/users');

// @route   POST api/users
// @desc    Register user
// @access  public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please inclue valid email').isEmail(),
    check(
      'password',
      'please enter password with 8 or more characters'
    ).isLength({ min: 8 }),
  ],
  userController.newUser
);

module.exports = router;
