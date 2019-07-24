const { MongoClient } = require('mongodb');
const { MONGO_CONNECTION_STRING } = require('../../config');

const options = {
  useNewUrlParser: true
};

const databases = {};

function connect(url, database) {
  return MongoClient.connect(url, options).then(client => client.db(database));
}

async function initializeDatabases() {
  // const databases = await Promise.all([connect(uri)]);
  const searchbar = await connect(
    MONGO_CONNECTION_STRING,
    'searchbar'
  );
  databases.searchbar = searchbar;
}

function getSearchBarDatabase() {
  return databases.searchbar;
}

function getItemsCollection() {
  return databases.searchbar.collection('items');
}

module.exports = {
  initializeDatabases,
  getSearchBarDatabase,
  getItemsCollection
};
