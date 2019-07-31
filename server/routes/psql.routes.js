const express = require('express');
const psql = require('../../db/postgres/items.js');

const psqlItemsRouter = express.Router();

psqlItemsRouter.get('/', (req, res) => {
  psql
    .findAItem()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

psqlItemsRouter.get('/:itemid', (req, res) => {
  const { itemid } = req.params;

  psql
    .findOneById(itemid)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

psqlItemsRouter.get('/', (req, res) => {
  const { search } = req.query.search;

  psql
    .fullTextSearch(search)
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

module.exports = psqlItemsRouter;
