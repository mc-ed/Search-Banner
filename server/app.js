const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { HOST, PORT } = require('../config');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(
  bodyParser.json({
    strict: false
  })
);

app.use('/', express.static('public'));

app.use('/items', require('./routes/items.routes.js'));

module.exports = app;
