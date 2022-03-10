const { validationResult } = require('express-validator');
const Wallet = require('../models/Wallet');
const Order = require('../models/Order');
const itemList = require('../res/items.json');

const getItems = async (req, res) => {
  res.json(itemList);
};

const purchase = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { itemId } = req.body;
  try {
    // check if item exist
    const item = itemList.find((i) => i.id === itemId);
    if (!item) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid item id' }],
      });
    }
    // check if user has money
    const userWallet = await Wallet.findOne({
      where: { userId: req.user.id },
    });
    if (userWallet.gemBalance < item.gemCost) {
      console.error(
        `gem balance: ${userWallet.gemBalance}, item cost: ${item.gemCost}`
      );
      return res.status(400).json({
        errors: [{ msg: 'Insufficient gems' }],
      });
    }
    // update the wallet
    userWallet.gemBalance -= item.gemCost;
    userWallet.goldBalance += item.gold;
    await userWallet.save();

    // record a transaction
    await Order.create({
      itemName: item.name,
      gemPaid: item.gemCost,
      goldAwarded: item.gold,
      userId: req.user.id,
    });

    res.json(userWallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getItems, purchase };
