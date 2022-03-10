require('dotenv').config();
const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'shop',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSOWRD || 'password',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  jwt: {
    secret: 'somerandomsecret',
    expiry: 3600000,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'shop',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSOWRD || 'password',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  jwt: {
    secret: 'anotherrandomsecret',
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];
