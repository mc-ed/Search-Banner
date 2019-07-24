const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { HOST, PORT } = require('../config');
const db = require('../db/mongodb/index.js');

//Routes
const { itemsRouter } = require('./routes/items.routes.js');
const { legacyRouter } = require('./routes/legacy.routes.js');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(
  bodyParser.json({
    strict: false
  })
);

app.use('/', express.static('public'));

// app.get('/item', (req, res) => {
//   res.send('/item is working!');
// });

app.use('/items', require('./routes/items.routes.js'));
app.use('/*', require('./routes/legacy.routes.js'));

module.exports = app;
