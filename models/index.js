var Sequelize = require('sequelize');
const conf = require('../config/config');

let sequelize;

switch (process.env.NODE_ENV) {
  case 'test':
    sequelize = new Sequelize('sqlite::memory:', {
      logging: false,
    });
    break;

  default:
    const {
      db: { host, port, database, username, password, dialect },
    } = conf;

    sequelize = new Sequelize(database, username, password, {
      dialect,
      host,
      port,
    });
    break;
}

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

if (process.env.NODE_ENV === 'dev') {
  sequelize.sync({ alter: true });
}

module.exports = db;
