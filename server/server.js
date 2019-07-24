const app = require('./app');
const { HOST, PORT } = require('../config');

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
