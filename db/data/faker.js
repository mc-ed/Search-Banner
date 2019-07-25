const faker = require('faker');
const fs = require('fs');

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
  const randomItemName = faker.fake(
    '{{commerce.productAdjective}} {{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}, {{commerce.color}}'
  );
  const randomRating = faker.finance.amount(0, 5, 3);
  const randomCategory = faker.commerce.department();
  const randomViews = faker.random.number();
  const randomTimestamp = faker.date.recent();

  const fakeItem = `${await randomID},${await randomItemName},${await randomViews},${await randomCategory},${await randomTimestamp}\n`;

  return fakeItem;
}

let longStr = '';
console.time('timer');
for (let i = 0; i < 1; i += 1) {
  longStr += makeFakeItem();
}

(async () => {
  await fs.appendFile('../seeding.csv', longStr, err => {
    if (err) {
      console.log(err);
    }
  });
  console.timeEnd('timer');
})();

module.exports = {
  makeFakeItem
};
