const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Wallet = require('./Wallet');
const Order = require('./Order');

const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Wallet);
User.hasMany(Order);
module.exports = User;
