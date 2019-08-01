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

  const fakeItem = `${randomID},${randomItemName},${randomViews},${randomCategory}\n`;

  return fakeItem;
}

/* FAKE DATA GENERATOR */

/**
 * Generates fake items and returns a string formatted for CSVs
 * @param {number} n number of fake items to be generated
 * @returns {string} a string of n fake items
 */
function makeFakeItems(n) {
  let longStr = '';
  console.time(`Generating ${n} items`);
  for (let i = 0; i < n; i += 1) {
    longStr += makeFakeItem();
  }
  console.timeEnd(`Generating ${n} items`);
  return longStr;
}

/**
 * Writes a specific number of fake items to a CSV
 * @param {number} n items
 */
async function writeToCSV(n) {
  const data = makeFakeItems(n);
  await fs.appendFile(path.resolve(__dirname, 'Seed_1M_1.csv'), data, err => {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Writes 10M items to a CSV specified by interal variables
 * May time out/heap overflow
 */
async function writeTenMillion() {
  for (let i = 0; i < 5; i++) {
    await writeToCSV(200000);
  }
}

writeTenMillion();
