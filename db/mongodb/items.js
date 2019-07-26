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

module.exports = {
  findOneItem
};
