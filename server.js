const _app = require('./app');
const config = require('./config/config');

const app = _app();

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
