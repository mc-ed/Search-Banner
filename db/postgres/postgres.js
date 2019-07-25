const { Client } = require('pg');

async function intializePG() {
  const client = new Client();
  await client.connect();
  const res = await client.query('SELECT NOW()');
  await client.end();
  console.log(res);
}

intializePG();

module.exports = {
  intializePG
};
