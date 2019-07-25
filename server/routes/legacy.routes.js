const express = require('express');
const legacyRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');
const db = require('../../db/mongodb/index.js');

const round = 10;

const whitelist = [
  'http://localhost:3000',
  'http://fec-proxy.us-east-1.elasticbeanstalk.com',
  'http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com',
  '',
  'http://fec-lowes-proxy.us-east-2.elasticbeanstalk.com',
  'http://lowesproductoverview-env.mk2qecy2ne.us-east-2.elasticbeanstalk.com'
];
const whitelistRegex = /http:\/\/localhost.*/;

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // console.log('in corsoption origin is: ', origin);
    if (
      whitelist.indexOf(origin) !== -1 ||
      !origin ||
      whitelistRegex.test(origin)
    ) {
      // console.log('hi');
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

legacyRouter.use(cors());
// legacyRouter.use((req, res, next) => {
//   console.log(`Accepting ${req.method} method from ${req.ip} to ${req.url}`);
//   next();
// });

legacyRouter.use(cookieParser('DJDJ'));

legacyRouter.post('/savecart', (req, res) => {
  console.log('saving to cart cookie: ', req.signedCookies.user_id);
  db.saveCart(req.signedCookies.user_id, req.body.cartItemList)
    .then(cart => {
      res.send('successfully saved cart!');
    })
    .catch(savingErr => {
      console.log('saving error', savingErr);
      res.send({ msg: 'saving cart err' });
    });
});

legacyRouter.post('/deleteCartItem', (req, res) => {
  db.deleteCartItem(req.signedCookies.user_id)
    .then(cart => {
      res.send('deleted 0 item');
    })
    .catch(err => {
      res.send({ msg: 'deleting cart item err' });
    });
});

function cartLogic(req, res, next) {
  const origin = req.get('origin');
  console.log('origin', origin);
  console.log('length: ', Object.keys(req.signedCookies).length);

  if (Object.keys(req.signedCookies).length === 0) {
    let cookie = uuidv4();
    res.cookie('user_id', cookie, { signed: true });

    db.saveCart(cookie, [])
      .then(cart => {
        next();
      })
      .catch(err => {
        console.log('error in server saveCart in cartshit', err);
        next();
      });
  } else {
    next();
  }
}

legacyRouter.get('/getcart', cartLogic, (req, res) => {
  db.getCart(req.signedCookies.user_id)
    .then(cart => {
      res.send(cart);
    })
    .catch(err => {
      console.log('error in getting initial cart', cart);
      res.send({ data: [] });
    });
});

legacyRouter.post('/signup', (req, res) => {
  console.log(req.body);
  bcrypt.genSalt(round, (err, salt) => {
    if (err) {
      console.log(err);
      res.send('HAHAHAHLOLOLOLOL');
    } else {
      bcrypt.hash(req.body.password, salt, (error, hashedPW) => {
        if (err) {
          console.log('error in hash:', error);
          res.send('HASHAHHAHDLOLOLO@@@@@');
        } else {
          console.log('cookies', req.signedCookies);
          db.signUp(req.signedCookies.user_id, req.body.username, hashedPW)
            .then(signedup => {
              console.log('signed up! got back: ', signedup);
              res.send({ msg: '' });
            })
            .catch(usernameExist => {
              console.log('usernameexist:', usernameExist);
              res.send({ msg: 'usernameExsit' });
            });
        }
      });
    }
  });
});

legacyRouter.post('/login', (req, res) => {
  db.logIn(req.body.username)
    .then(hashedPW => {
      bcrypt.compare(req.body.password, hashedPW).then(result => {
        console.log(result);
        if (result) {
          res.send(true);
        } else {
          res.send({ msg: 'Password is incorrect' });
        }
      });
    })
    .catch(longinFail => {
      console.log('login route fail', longinFail);
      res.send({ msg: 'Username not found' });
    });
});

legacyRouter.get('/getusercart', (req, res) => {
  // console.log(req.query.username)
  db.getUserCart(req.query.username, req.signedCookies.user_id)
    .then(userCart => {
      console.log(userCart);
      res.send(userCart);
    })
    .catch(nocart => {
      console.log('getusercart route error: ', nocart);
      res.send('noPe');
    });
});

legacyRouter.get('/logout', (req, res) => {
  db.logOut(req.query.username)
    .then(loggedOut => {
      console.log('logoutted', loggedOut);
      res.clearCookie('user_id');
      let cookie = uuidv4();
      res.cookie('user_id', cookie, { signed: true });
      res.send();
    })
    .catch(didnt => {
      console.log('logout route error: ', didnt);
      res.send('nope');
    });
});

legacyRouter.post('/savefavorite', (req, res) => {
  console.log(req.body);
  db.saveFavorite(req.body.username, req.body.favorite)
    .then(result => {
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.send();
    });
});

legacyRouter.post('/removefavorite', (req, res) => {
  db.removeFavorite(req.body.username, req.body.favorite)
    .then(result => {
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.send();
    });
});

legacyRouter.get('/getfavorite', (req, res) => {
  db.getFavorite(req.query.username)
    .then(favorite => {
      console.log('sending faborite: ', favorite);
      res.send(favorite);
    })
    .catch(none => {
      console.log('getfave error on server', none);
      res.send({});
    });
});

module.exports = legacyRouter;
