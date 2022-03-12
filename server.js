const _app = require('./app');
const config = require('./config/config');
// const db = require('./models');
// const Sequelize = require('sequelize');

// db(Sequelize); //if we want to use this way. need to make models/index.js export a function that takes sequelize as arg
const app = _app();

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
