const express = require('express');
const {
  getAllItems,
  get3Items,
  addOneFake,
  addManyFakeItems
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

itemsRouter.get('/fakeOne', (req, res) => {
  addOneFake().then(item => {
    res.send(item);
  });
});

module.exports = itemsRouter;
