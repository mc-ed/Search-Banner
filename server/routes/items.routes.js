const express = require('express');
const mongo = require('../../db/mongodb/items.js');

const itemsRouter = express.Router();

itemsRouter.use('/psql', require('./psql.routes'));

itemsRouter.get('/', (req, res) => {
  mongo
    .findTenItems()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

itemsRouter.get('/:itemid', (req, res) => {
  const { itemid } = req.params;

  const ID = parseInt(itemid, 10);

  mongo
    .findOneById(ID)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      console.error(err);
      res.send();
    });
});

itemsRouter.get('/', (req, res) => {
  const { search } = req.query.search;

  console.log(search);

  mongo
    .fullTextSearch(search)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      console.error(err);
      res.send();
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
