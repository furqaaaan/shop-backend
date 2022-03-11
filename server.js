const express = require('express');
const config = require('./config/config');
const sequelize = require('./models').sequelize;
const app = express();

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .then(sequelize.sync({ alter: true })) // for development
  .catch((err) => {
    console.error('Unable to connect to the database:', error);
  });

// Body parser
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gem', require('./routes/gem'));
app.use('/api/shop', require('./routes/shop'));

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
