var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dongjae93:qkrehdwo7@connect4-xkfvh.mongodb.net/FEC?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const itemSchema = new mongoose.Schema({
  id: Number,
  itemName: String,
  rating: Number,
  numRating: Number,
  category: String
})

const cartSchema = new mongoose.Schema({
  uid: String,
  cartItemList: Array
})

const Item = mongoose.model('Item', itemSchema);
const Cart = mongoose.model('Cart', cartSchema);
// new Item({
//   id: 43,
//   itemName: "John-Deere-Z335E-20-HP-V-twin-Dual-Hydrostatic-42-in-Zero-turn-Lawn-Mower-with-Mulching-Capability-(Kit-Sold-Separately)",
//   rating: 4.5,
//   numRating: 155,
//   category: 'Lawn Mower'
// }).save((err, newItem)=> {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(`${newItem.id} Added to db!`);
//     db.close();
//   }
// })

const saveCart = (ip, cartItemList) => {
  return new Promise((res, rej) => {
    Cart.findOneAndUpdate({uid: ip}, { cartItemList }, {upsert: true }, (err, cart) => {
      if(err) {
        rej(err);
      }
      res(cart);
    })
  })
}

const getCart = (ip) => {
  return new Promise((res, rej) => {
    console.log('requesting from ip: ', ip);
    Cart.findOne({uid: ip}, (err, cart) => {
      console.log('found cart from getCart', cart)
      if(err) {
        rej(err);
      }
      res(cart);
    })
  })
}

const getAllItemList = () => {
  
  return new Promise((res, rej) => {
    Item.find((err, items) => {
      if(err) {
        rej(err);
      } else {
        res(items);
      }
    })
    .sort({category: 1});
  })
}

const get3Items = (category) => {
  return new Promise((res, rej) => {
    Item
    .find({category: category}, (err, items) => {
      if(err) {
        rej(err);
      } else {
        res(items);
      }
    })
    .sort({rating: -1})
    .sort({numRating: -1})
  })
}

module.exports = { getAllItemList, get3Items, saveCart, getCart };