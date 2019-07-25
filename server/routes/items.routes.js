const express = require('express');
const {
  insertOneFakeItem,
  insertManyFakeItems,
  insertOneMillionFakeItems
} = require('../../db/mongodb/items.js');
const { initalizePG } = require('../../db/postgres/items.js');

const itemsRouter = express.Router();

itemsRouter.get('/', (req, res) => {
  get10Items().then(items => {
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

itemsRouter.get('/fakeMillion', (req, res) => {
  insertOneMillionFakeItems()
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
