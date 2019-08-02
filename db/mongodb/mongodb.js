const { MongoClient } = require('mongodb');
const { MONGO_ATLAS_CONNECTION_STRING } = require('../../config');

const connectionString = MONGO_ATLAS_CONNECTION_STRING;

const options = {
  useNewUrlParser: true
};

const databases = {};

/**
 * attempts to connect to a MongoDB database and returns a promise
 * that resolves to the connection on success.
 * @param {string} url a mongoDB connection string
 * @param {string} database the name of a database
 * @returns {promise} that resolves to database connection
 */
function connect(url, database) {
  return MongoClient.connect(url, options)
    .then(client => client.db(database))
    .catch(err => {
      throw err;
    });
}

/**
 * Intializes all database connections and adds them to the databases
 * storage object.
 *
 * Allows for database connections to be reused and passed to other files.
 *
 * Needs to be run before the server starts listening for requests.
 */
async function initializeDatabases() {
  // const databases = await Promise.all([connect(uri)]);
  const searchbar = await connect(
    connectionString,
    'searchbar'
  );
  databases.searchbar = searchbar;
}

/**
 * Returns the 'searchbar' database.
 *
 * Can only be used in code that is executed/required after app intializes
 * or it will throw an undefined error.
 *
 * @returns {object} database connection
 */
function getSearchBarDatabase() {
  return databases.searchbar;
}

/**
 * Returns the 'items collection of the 'searchbar' database.
 *
 * Can only be used in code that is executed/required after app intializes
 * or it will throw an undefined error.
 *
 * @returns {object} 'items' collection of 'searchbar' database.
 */
function getItemsCollection() {
  return databases.searchbar.collection('items');
}

module.exports = {
  initializeDatabases,
  getSearchBarDatabase,
  getItemsCollection
};
