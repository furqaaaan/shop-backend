const express = require('express');
const db = require('./config/db');

const app = express();

// DATABASE
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .then(db.sync())
  .catch((err) => {
    console.error('Unable to connect to the database:', error);
  });

// Body parser
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/gem', require('./routes/api/gem'));
// app.use('/api/shop', require('./routes/api/shop'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
