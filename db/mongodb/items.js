const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  id: Number,
  itemName: String,
  rating: Number,
  numRating: Number,
  category: String
});

const Item = mongoose.model('Item', itemSchema);

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
  get3Items
};
