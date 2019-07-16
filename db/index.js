var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dongjae93:qkrehdwo7@connect4-xkfvh.mongodb.net/FEC?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const itemSchema = new mongoose.Schema({
  id: Number,
  itemName: String,
  rating: Number,
  numRating: Number,
  category: String
})

const sessionSchema = new mongoose.Schema({
  cookie: Number
})

const Item = mongoose.model('Item', itemSchema);
const Session = mongoose.model('Session', sessionSchema);
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

const getAllItemList = () => {
  
  return new Promise((res, rej) => {
    Item.find((err, items) => {
      if(err) {
        rej(err);
      } else {
        res(items);
      }
    })
    .sort({category: 1})
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

module.exports = { getAllItemList, get3Items };