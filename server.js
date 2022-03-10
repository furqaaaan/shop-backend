const express = require('express');
const db = require('./config/db');
const config = require('./config/config');

const app = express();

// DATABASE
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .then(db.sync({ alter: true }))
  .catch((err) => {
    console.error('Unable to connect to the database:', error);
  });

// Body parser
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/gem', require('./routes/api/gem'));
// app.use('/api/shop', require('./routes/api/shop'));

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
