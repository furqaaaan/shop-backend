const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  gemBalance: {
    type: DataTypes.INTEGER,
  },
  goldBalance: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Order;
