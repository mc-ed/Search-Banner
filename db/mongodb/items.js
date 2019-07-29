const { getItemsCollection } = require('./mongodb');

/**
 * Finds one item from Mongo database items collection
 * Updates the last accessed and views to keep track of priority
 * @returns {promise} a promise that resolves to one item
 */
function findOneItem() {
  const searchParams = {
    itemId: { $gt: 1 }
  };

  return getItemsCollection()
    .findOne(searchParams)
    .then(item => {
      console.log(item);
      return item;
    })
    .catch(err => {
      throw err;
    });
}

/**
 * Finds one item from Mongo database items collection
 * Updates the last accessed and views to keep track of priority
 * @param {number} itemId a itemId
 * @returns {promise} a promise that resolves to one item
 */
function findOneById(itemId) {
  const searchParams = { itemId: { $eq: itemId } };

  return getItemsCollection()
    .findOne(searchParams)
    .then(item => {
      return item;
    })
    .catch(err => {
      throw err;
    });
}

/**
 * Finds ten item from Mongo database items collection
 * Updates the last accessed and views to keep track of priority
 * @returns {promise} a promise that resolves to one item
 */
function findTenItems() {
  const searchParams = { views: { $gt: 1 } };
  const options = { limit: 10 };

  return getItemsCollection()
    .find(searchParams, options)
    .toArray()
    .then(items => {
      return items;
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  findOneItem,
  findOneById,
  findTenItems
};
