var Sequelize = require('sequelize');
const conf = require('../config/config');

const {
  db: { host, port, database, username, password, dialect },
} = conf;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Wallet = require('./Wallet')(sequelize, Sequelize);
db.Order = require('./Order')(sequelize, Sequelize);

db.User.hasOne(db.Wallet, {
  foreignKey: 'userId',
});
db.User.hasMany(db.Order, {
  foreignKey: 'userId',
});

module.exports = db;
