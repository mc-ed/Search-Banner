const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const PORT = 3000;
const db = require('../db/index.js');
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.set('trust proxy', true)
app.use(cookieParser('DJDJ'));
app.use((req, res, next) => {
  console.log(req.signedCookies);
  // res.clearCookie('user_ip');
  // res.cookie('user_ip', req.ip, {signed: true});
  next();
})
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
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
  db.saveCart(req.signedCookies.user_ip, req.body.cartItemList).then((cart) => {
    res.send('successfully saved cart!');
  })
})


app.listen(PORT, '127.0.0.1', () => (console.log(`Listening for port: ${PORT}`)));