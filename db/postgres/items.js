const psql = require('./postgres');

/**
 * Finds one psuedo-random item from PSQL database from items table
 * @returns {promise} a promise that resolves to one item
 */
function findAItem() {
  let text = 'SELECT * FROM items OFFSET floor(random() * 100000) LIMIT 1';
  let values = [];

  return psql
    .query(text, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      throw err.stack;
    });
}

/**
 * Finds ten item from PSQL database from items table
 * Updates the views to keep track of priority
 * @returns {promise} a promise that resolves to ten items
 */
function findTenItems() {
  let text = 'SELECT * FROM items OFFSET floor(random() * 1000000) LIMIT 10';
  let values = [];

  return psql
    .query(text, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      throw err.stack;
    });
}

/**
 * Looks up an item by id from PSQL database from items table
 * @param {number} id an item idea
 * @returns {promise} a promise that resolves to one item or null if not found
 */
function findOneById(id) {
  let text = 'SELECT * FROM items WHERE itemid=($1)';
  let values = [id];

  return psql
    .query(text, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      throw err.stack;
    });
}

/**
 * Finds 10 (or fewer) relevent items based on the search term from PSQL database
 * @param {string} term a search term
 * @returns {promise} a promise that resolves to 10 or fewer item or null if none found
 */
function fullTextSearch(term) {
  const text =
    'SELECT * FROM items WHERE document_vectors @@ to_tsquery($1) LIMIT 10;';
  const values = [term];

  return psql
    .query(text, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      throw err.stack;
    });
}

module.exports = {
  findAItem,
  findOneById,
  fullTextSearch,
  findTenItems
};
