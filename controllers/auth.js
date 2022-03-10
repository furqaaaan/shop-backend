const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid credentials' }],
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      
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

function createJwtToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
}

module.exports = { login };
