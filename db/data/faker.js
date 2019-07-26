const faker = require('faker');
const fs = require('fs');
const path = require('path');

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
function makeFakeItem() {
  const randomID = faker.finance.amount(0, 1000000000, 0);
  const randomItemName = faker.fake(
    '{{commerce.productAdjective}} {{commerce.productAdjective}} {{commerce.productAdjective}} {{commerce.productMaterial}} and {{commerce.productMaterial}} {{commerce.product}} in {{commerce.color}}'
  );
  const randomRating = faker.finance.amount(0, 5, 3);
  const randomCategory = faker.commerce.department();
  const randomViews = faker.random.number();
  const randomTimestamp = faker.date.recent();

  const fakeItem = `${randomID},${randomItemName},${randomViews},${randomCategory},${randomTimestamp}\n`;

  return fakeItem;
}

/* FAKE DATA GENERATOR */

function makeFakeItems(n) {
  let longStr = '';
  console.time(`Generating ${n} items`);
  for (let i = 0; i < n; i += 1) {
    longStr += makeFakeItem();
  }
  console.timeEnd(`Generating ${n} items`);
  return longStr;
}

async function writeToCSV() {
  const data = makeFakeItems(500000);
  await fs.appendFile(path.resolve(__dirname, 'seedData.csv'), data, err => {
    if (err) {
      console.log(err);
    }
  });
}

async function writeTenMillion() {
  for (i = 0; i < 1; i++) {
    await writeToCSV();
  }
}

writeTenMillion();

module.exports = {
  makeFakeItem
};
