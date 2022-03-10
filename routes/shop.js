const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const shopController = require('../controllers/shop');
const auth = require('../middleware/auth');

// @route   GET api/shop/items
// @desc    Get list of shop items
// @access  public
router.get('/items', shopController.getItems);

// @route   POST api/shop/purchase
// @desc    Purchase an item from the shop
// @access  private
router.post(
  '/purchase',
  [auth, [check('itemId', 'itemId is required').notEmpty()]],
  shopController.purchase
);

module.exports = router;
