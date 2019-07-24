const mongoose = require('mongoose');
const { makeFakeItem } = require('./faker');

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
const saveOneItem = itemObject => {
  console.log('Attempting to insert', itemObject);
  new Item(itemObject).save((err, newItem) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newItem.id} Added to db!`);
      db.close();
    }
  });
};

/**
 * Saves n number of fakeItems to the database
 * @param {number} n fakeItems to be added
 */

const addManyFakeItems = n => {
  console.log(`Attempting to insert ${n} fakeItems`);
};

/**
 * This function gets all items from MongoDB items collection
 * @returns {promise} that evaluates to an array of objects
 */

const getAllItemList = () => {
  return new Promise((res, rej) => {
    Item.find((err, items) => {
      if (err) {
        rej(err);
      } else {
        res(items);
      }
    }).sort({ category: 1 });
  });
};

/**
 * This function gets 3 items from a matching catagory
 * in the MongoDB items collection
 * @param {string} catagory item catagory as a string
 * @returns {promise} that evaluates to an array of objects
 */

const get3Items = category => {
  return new Promise((res, rej) => {
    Item.find({ category: category }, (err, items) => {
      if (err) {
        rej(err);
      } else {
        res(items);
      }
    })
      .sort({ rating: -1 })
      .sort({ numRating: -1 });
  });
};

module.exports = {
  getAllItemList,
  get3Items,
  saveOneItem,
  addManyFakeItems
};
