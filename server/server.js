const app = require('./app');
const { HOST, PORT } = require('../config');
const { initializeDatabases } = require('../db/mongodb/mongodb');

initializeDatabases().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
});
