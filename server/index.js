const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const PORT = 3000;
const db = require('../db/index.js');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.set('trust proxy', true)
app.use(cookieParser('DJDJ'));
app.use((req, res, next) => {
  const origin = req.get('origin');
  console.log(origin);
  if(Object.keys(req.signedCookies).length === 0) {
    let cookie = uuidv4();
    res.cookie('user_id', cookie, {signed: true});
    console.log('am I stuck here? saving to cookie: ', cookie)
    db.saveCart(cookie, []).then(() => {
      db.getCart(cookie).then((cart) => {
        res.send(cart);
      })
    })
  } else {
    next();
  }
  // res.clearCookie('user_ip');
  // res.cookie('user_ip', req.ip, {signed: true});
  
})
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/itemlist', (req, res) => {
  db.getAllItemList().then((items) => {
    res.send(items);
  })
})

app.get('/item', (req, res) => {
  db.get3Items(req.query.category).then((result) => {
    // console.log(result);
    res.send(result);
  })
})

app.post('/savecart', (req, res) => {
  db.saveCart(req.signedCookies.user_id, req.body.cartItemList).then((cart) => {
    res.send('successfully saved cart!');
  })
})

app.get('/getcart', (req, res) => {
  console.log('getting resquest from getcart from signedcookie:');
  db.getCart(req.signedCookies.user_id).then((cart) => {
    res.send(cart);
  })
})


app.listen(PORT, () => (console.log(`Listening for port: ${PORT}`)));