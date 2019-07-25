const faker = require('faker');

// id: { type: Number, unique: true },
// itemName: { type: String, unique: true },
// rating: Number,
// category: String,
// numRating: Number,
// views: Number,

/**
 * Returns a promise that resolves to a random fake item
 * @returns {promise} resolves to item object matching Item schema
 */
async function makeFakeItem() {
  const randomID = faker.finance.amount(0, 1000000000, 0);
  const randomItemName = faker.commerce.productName();
  const randomRating = faker.finance.amount(0, 5, 3);
  const randomCategory = faker.commerce.department();
  const randomViews = faker.random.number();
  const randomTimestamp = faker.date.recent();

  const fakeItem = {
    id: await randomID,
    itemName: await randomItemName,
    views: await randomViews,
    category: await randomCategory,
    lastAccessed: await randomTimestamp
  };

  return fakeItem;
}

module.exports = {
  makeFakeItem
};
