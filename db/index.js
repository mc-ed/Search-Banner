var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dongjae93:qkrehdwo7@connect4-xkfvh.mongodb.net/FEC?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
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
  cookie: String,
  username: { type: String, default: 'Anonymous' },
  cartItemList: Array
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  cookie: String
})



const Item = mongoose.model('Item', itemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const User = mongoose.model('User', userSchema);
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

const deleteCartItem = (id) => {
  // console.log('deleting cart of: ', id);
  return new Promise((res, rej) => {
    Cart.updateOne({cookie: id}, {"$pull": {"cartItemList": {"amount": '0'}}}, { multi:true }, (err, obj) => {
      if(err) {
        rej(err)
      } else {
        console.log('removed ', obj);
        res(obj)
      }
    })
  })
}

const saveCart = (id, cartItemList) => {
  // console.log('saving this id', id);
  return new Promise((res, rej) => {
    Cart.findOneAndUpdate({cookie: id}, { cartItemList }, {upsert: true }, (err, cart) => {
      if(err) {
        console.log('save cart error: ', err);
        rej(err);
      } else {
        res(cart);
      }
    })
    
  })
}

const getCart = (id) => {
  return new Promise((res, rej) => {
    console.log('requesting from ip: ', id);
    Cart.findOne({cookie: id}, (err, cart) => {
      
      console.log('found cart from getCart', cart)
      if(err) {
        console.log('get cart error: ', err);
        rej(err);
      }
      res(cart);
    })
  })
}

const getUserCart = (username, cookie) => {
  return new Promise((res, rej) => {
    Cart.findOne({ username }, (err, cart) => {
      if(err) {
        console.log('error getting specific user', err);
        rej(err);
      } else {
        Cart.findOneAndUpdate({ username }, {cookie}, (err, updated) => {
          if(err) {
            console.log('updating user cart cookie error:', err);
          } else {
            console.log('updated cookie of user cart succcessfully', updated);
            res(cart);
          }
        })
      }
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

const signUp = (cookie, username, password) => {
  let promises = [];
  promises.push(new Promise((res, rej) => {
    Cart.findOneAndUpdate({cookie: cookie}, { username }, (err, cart) => {
      if(err) {
        console.log('signing into cart error: ', err);
        rej(err);
      }
      res(cart);
    })
  }))
  let newUser = new User({ username, password, cookie });
  promises.push(newUser.save());
  return Promise.all(promises);
}

const logIn = (username) => {
  return new Promise((res, rej) => {
    User.findOne({username})
    .then((user) => {
      if(!user) {
        console.log('user not found');
        rej('user not found');
      } else {
        res(user.password);
      }
    })
    .catch((err) => {
      rej(err);
    })
  })
}

const resetCookie = (username, cookie) => {


  return (
    new Promise((res, rej) => {
      User.findOneAndUpdate({ username }, { cookie }, (err, updatedCookie) => {
        if(err) {
          console.log('error occure resetting user cookie', err);
          rej(err);
        } else {
          res(updatedCookie);
        }
      })
    })
  )
}

const logOut = (username) => {

  return (
    new Promise((res, rej) => {
      User.findOneAndUpdate({ username }, { cookie: "" }, (err, deletedCookie) => {
        if(err) {
          console.log('error occure logging out user cookie', err);
          rej(err);
        } else {
          res(deletedCookie);
        }
      })
    })
  )


}

module.exports = { getAllItemList, get3Items, saveCart, getCart, deleteCartItem, signUp, logIn, logOut, getUserCart, resetCookie };