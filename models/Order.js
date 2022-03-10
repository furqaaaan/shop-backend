const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  itemName: {
    type: DataTypes.STRING,
  },
  gemPaid: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  goldAwarded: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Order;
