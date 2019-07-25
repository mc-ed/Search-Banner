const { getItemsCollection } = require('./mongodb');
const { makeFakeItem } = require('./faker');

/**
 * Inserts one automatically generated fake item to the database
 *
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

/**
 * Inserts many automatically generated fake item to the database
 *
 * @returns {promise} a promise that resolves to the number of fake items inserted
 */
async function insertManyFakeItems() {
  const items = [];
  for (let i = 0; i < 99000; i++) {
    items.push(makeFakeItem());
  }

  const resolvedItems = await Promise.all(items);

  return getItemsCollection()
    .insertMany(resolvedItems, { ordered: false })
    .then(success => {
      return success.result.nInserted.toString();
    })
    .catch(err => {
      return err.result.nInserted.toString();
    });
}

module.exports = {
  insertOneFakeItem,
  insertManyFakeItems
};
