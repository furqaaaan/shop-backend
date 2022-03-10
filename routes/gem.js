const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const gemController = require('../controllers/gem');
const auth = require('../middleware/auth');

// @route   POST api/gem
// @desc    Add gems to account
// @access  private
router.post(
  '/',
  [
    auth,
    [check('gemCount', 'value > 0 is required').isNumeric().isInt({ min: 1 })],
  ],
  gemController.getGems
);

module.exports = router;
