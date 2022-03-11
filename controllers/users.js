const { validationResult } = require('express-validator');
var User = require('../models').User;
const Wallet = require('../models').Wallet;
const { hashPassword, createJwtToken } = require('../utils/authUtil');

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
    return res.json({ token: createJwtToken(payload) });
  } catch (error) {
    if (error.name == 'EmailInUseError') {
      return res.status(404).json({
        errors: [{ msg: error.message }],
      });
    }
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};

const getLoggedInUser = async (req, res) => {
  const user = await User.scope('withoutPassword').findByPk(req.user.id);
  res.json(user);
};

async function createUser(name, email, password) {
  let user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    throw {
      name: 'EmailInUseError',
      message: 'Email is already in use.',
    };
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

module.exports = { newUser, getLoggedInUser };
