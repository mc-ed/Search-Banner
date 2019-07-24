const express = require('express');
const db = require('../../db/mongodb/index.js');
const {
  getAllItemList,
  get3Items,
  saveOneItem,
  addManyFakeItems
} = require('../../db/mongodb/index.js');

const itemsRouter = express.Router();

itemsRouter.get('/list', (req, res) => {
  getAllItemList().then(items => {
    res.send(items);
  });
});

itemsRouter.get('/', (req, res) => {
  get3Items(req.query.category).then(result => {
    // console.log(result);
    res.send(result);
  });
});

module.exports = itemsRouter;
