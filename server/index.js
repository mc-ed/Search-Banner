const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const PORT = 3000;
const db = require('../db/index.js');
const cors = require('cors')

app.use(cors());
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



app.listen(PORT, () => (console.log(`Listening for port: ${PORT}`)));