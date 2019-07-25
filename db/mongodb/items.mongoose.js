const mongoose = require('mongoose');
const { makeFakeItem } = require('../data/faker');

const db = mongoose.connection;
const itemSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    itemName: { type: String, unique: true },
    rating: Number,
    numRating: Number,
    category: String,
    views: Number
  },
  { timestamps: { updatedAt: 'last_accessed' } }
);

const Item = mongoose.model('Item', itemSchema);

/**
 * Saves one item to the database from an item object
 * @param {object} itemObject a item object following the item schema
 */
const addOneFake = async itemObject => {
  console.log('Attempting to insert', itemObject);
  new Item(itemObject)
    .save((err, newItem) => {
      if (err) {
        throw Error(err);
      } else {
        db.close();
        return newItem;
      }
    })
    .then(item => {
      return item;
    });
};

/**
 * Saves n number of fakeItems to the database
 * @param {number} n fakeItems to be added
 */

const addManyFakeItems = async n => {
  console.log(`Attempting to insert ${n} fakeItems`);

  const fakeItemsArray = [];

  for (let i = 0; i < n; i++) {
    fakeItemsArray.push(makeFakeItem());
  }

  return fakeItemsArray;
};

/**
 * This function gets all items from MongoDB items collection
 * @returns {promise} that evaluates to an array of objects
 */

const getAllItems = () => {
  return new Promise((res, rej) => {
    Item.find((err, items) => {
      if (err) {
        rej(err);
      } else {
        res(items);
      }
    }).sort({ last_accessed: 1 });
  });
};

/**
 * This function gets 3 items from a matching catagory
 * in the MongoDB items collection
 * @param {string} catagory item catagory as a string
 * @returns {promise} that evaluates to an array of objects
 */

const get3Items = () => {
  return new Promise((res, rej) => {
    Item.find({ itemName: /john/i }, (err, items) => {
      if (err) {
        rej(err);
      } else {
        res(items);
      }
    }).sort({ last_accessed: -1 });
  });
};

module.exports = {
  getAllItems,
  get3Items,
  addOneFake,
  addManyFakeItems
};
