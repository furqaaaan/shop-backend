const { validationResult } = require('express-validator');
const Wallet = require('../models/Wallet');

const getGems = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { gemCount } = req.body;
    const userWallet = await Wallet.findOne({
      where: { userId: req.user.id },
    });

    userWallet.gemBalance += gemCount;
    await userWallet.save();
    res.json(userWallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getGems };
