const express = require('express');
const mongo = require('../../db/mongodb/items.js');

const itemsRouter = express.Router();

itemsRouter.use('/psql', require('./psql.routes'));

itemsRouter.get('/', (req, res) => {
  if (req.query.id) {
    const itemid = req.query.id;

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
  } else if (req.query.search) {
    const { search } = req.query;

    mongo
      .fullTextSearch(search)
      .then(item => {
        res.send(item);
      })
      .catch(err => {
        console.error(err);
        res.send();
      });
  } else {
    mongo
      .findTenItems()
      .then(items => {
        res.send(items);
      })
      .catch(err => {
        console.error(err);
        res.send();
      });
  }
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
