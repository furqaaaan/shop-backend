const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Wallet = db.define('Wallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  gemBalance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  goldBalance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Wallet;
