const express = require('express');
const { insertOneFakeItem } = require('../../db/mongodb/items.js');

const itemsRouter = express.Router();

itemsRouter.get('/', (req, res) => {
  get3Items().then(items => {
    res.send(items);
  });
});

itemsRouter.get('/all', (req, res) => {
  getAllItems().then(items => {
    res.send(items);
  });
});

itemsRouter.get('/fakeOne', (req, res) => {
  insertOneFakeItem()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

module.exports = itemsRouter;
