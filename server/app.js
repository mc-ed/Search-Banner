const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { HOST, PORT } = require('../config');

const app = express();
// app.use(morgan('dev'));
app.use(cors());
app.use(
  bodyParser.json({
    strict: false
  })
);

app.use('/', express.static('public'));

app.use('/items', require('./routes/items.routes.js'));

/* *
 *
 * LEGACY ROUTES
 *
 * */

app.get('/itemlist', (req, res) => {
  res.send();
});

app.post('/savecart', (req, res) => {
  res.send();
});

app.post('/deleteCartItem', (req, res) => {
  res.send();
});

app.get('/getcart', (req, res) => {
  res.send();
});

app.post('/signup', (req, res) => {
  res.send();
});

app.post('/login', (req, res) => {
  res.send();
});

app.get('/getusercart', (req, res) => {
  res.send();
});

app.get('/logout', (req, res) => {
  res.send();
});

app.post('/savefavorite', (req, res) => {
  res.send();
});

app.post('/removefavorite', (req, res) => {
  res.send();
});

app.get('/getfavorite', (req, res) => {
  res.send();
});

module.exports = app;
