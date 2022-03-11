const jwt = require('jsonwebtoken');
const config = require('../config/config');
var User = require('../models').User;

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied',
    });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findByPk(decoded.user.id);
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
