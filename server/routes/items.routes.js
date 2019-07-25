const express = require('express');
const {
  insertOneFakeItem,
  insertManyFakeItems
} = require('../../db/mongodb/items.js');

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

itemsRouter.get('/fakeMany', (req, res) => {
  insertManyFakeItems()
    .then(success => {
      res.send(success);
    })
    .catch(err => {
      console.error(err);
      res.send();
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
