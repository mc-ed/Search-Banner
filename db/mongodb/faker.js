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
  const randomID = faker.random.number();
  const randomItemName = faker.commerce.productName();
  const randomRating = faker.finance.amount(0, 5, 3);
  const randomCategory = faker.commerce.department();
  const randomViews = faker.random.number();

  const fakeItem = {
    id: await randomID,
    itemName: await randomItemName,
    rating: await randomRating,
    numRating: await randomViews,
    views: await randomViews,
    category: await randomCategory
  };

  return fakeItem;
}

module.exports = {
  makeFakeItem
};
