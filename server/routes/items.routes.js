const express = require('express');
const { initalizePG } = require('../../db/postgres/items.js');
const { findTenItems } = require('../../db/mongodb/items.js');
const itemsRouter = express.Router();

itemsRouter.get('/', (req, res) => {
  findTenItems()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

itemsRouter.get('/next', (req, res) => {
  getNextItems().then(items => {
    res.send(items);
  });
});

/* *
 *
 * LEGACY ROUTES
 *
 * */

itemsRouter.get('/list', (req, res) => {
  res.send();
});

/*
 *
 * ROUTES FOR INSERTING FAKES
 *
 */

// itemsRouter.get('/fakeMany', (req, res) => {
//   insertManyFakeItems()
//     .then(success => {
//       res.send(success);
//     })
//     .catch(err => {
//       console.error(err);
//       res.send();
//     });
// });

// itemsRouter.get('/fakeMillion', (req, res) => {
//   insertOneMillionFakeItems()
//     .then(success => {
//       res.send(success);
//     })
//     .catch(err => {
//       console.error(err);
//       res.send();
//     });
// });

// itemsRouter.get('/fakeOne', (req, res) => {
//   insertOneFakeItem()
//     .then(item => {
//       res.send(item);
//     })
//     .catch(err => {
//       console.error(err);
//       res.send();
//     });
// });

module.exports = itemsRouter;
