const app = require('./app');
const { HOST, PORT } = require('../config');
const { intitalizeDatabases } = require('../db/mongodb/mongodb');

intitalizeDatabases().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
});
