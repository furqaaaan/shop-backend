const { Sequelize } = require('sequelize');
const conf = require('./config');

const {
  db: { host, port, database, username, password, dialect },
} = conf;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
});

module.exports = sequelize;
