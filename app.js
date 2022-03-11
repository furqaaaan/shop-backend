const express = require('express');

module.exports = () => {
  const app = express();

  // Body parser
  app.use(express.json({ extended: false }));

  app.use('/api/users', require('./routes/users'));
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/gem', require('./routes/gem'));
  app.use('/api/shop', require('./routes/shop'));
  return app;
};
