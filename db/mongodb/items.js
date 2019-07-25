const { getItemsCollection } = require('./mongodb');
const { makeFakeItem } = require('./faker');

/**
 * Inserts one automatically generated fake item to the database
 *
 * @param {object} itemObject a item object following the item schema
 * @returns {promise} a promise that resolves to the inserted fake item
 */
async function insertOneFakeItem() {
  const item = await makeFakeItem();

  // return item;

  return getItemsCollection()
    .insertOne(item)
    .then(result => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  insertOneFakeItem
};
