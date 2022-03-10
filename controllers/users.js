const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const config = require('../config/config');

const newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    await createWallet(user);

    const payload = {
      user: {
        id: user.id,
      },
    };
    res.json({ token: createJwtToken(payload) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

async function createUser(name, email, password) {
  let user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    return res.status(400).json({
      errors: [{ msg: 'User already exists' }],
    });
  }

  return await User.create({
    name,
    email,
    password: await hashPassword(password),
  });
}

async function createWallet(user) {
  return await Wallet.create({
    userId: user.id,
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function createJwtToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
}

module.exports = { newUser };
