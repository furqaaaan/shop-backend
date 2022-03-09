const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get('mysqluri'));

module.exports = sequelize;
