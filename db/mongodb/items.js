const { getItemsCollection } = require('./mongodb');

/**
 * Finds one item from database items collection
 * Updates the last accessed and views to keep track of priority
 * @returns {promise} a promise that resolves to one item
 */
function findOneItem() {
  const searchParams = {
    id: { $gt: 1 }
  };

  return result;
}

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
  for (let i = 0; i < 50000; i++) {
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

/**
 * Inserts many automatically generated fake item to the database
 *
 * @returns {promise} a promise that resolves to the number of fake items inserted
 */
async function insertOneMillionFakeItems() {
  const successfulInserts = [];

  for (let i = 0; i < 5; i += 1) {
    const insertPromises = [];

    for (let j = 0; j < 2; j += 1) {
      insertPromises.push(insertManyFakeItems());
    }
    // eslint-disable-next-line no-await-in-loop
    // actually want to wait until resolved to avoid heap overflow
    const insertions = await Promise.all(insertPromises);
    successfulInserts.push(insertions);

    console.log(`Has inserted ${100 + 100 * i}k items as of`, new Date());
  }

  return successfulInserts;
}

module.exports = {
  insertOneFakeItem,
  insertManyFakeItems,
  insertOneMillionFakeItems,
  findOneItem
};
