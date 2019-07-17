const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const PORT = 3000;
const db = require('../db/index.js');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');

const whitelist = ['http://localhost.com:3000', 'http://fec-proxy.us-east-1.elasticbeanstalk.com', 'http://lowesproxy-env.6tim4uzsty.us-east-2.elasticbeanstalk.com', 'http://search-banner.us-east-1.elasticbeanstalk.com']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log('in corsoption origin is: ', origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('hi');
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(`Accepting ${req.method} method from ${req.ip} to ${req.url}`);
  next();
})

app.use(cookieParser('DJDJ'));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/itemlist', (req, res) => {
  db.getAllItemList().then((items) => {
    res.send(items);
  })
})

app.get('/item', (req, res) => {
  db.get3Items(req.query.category).then((result) => {
    // console.log(result);
    res.send(result);
  })
})

app.post('/savecart', (req, res) => {
  console.log('saving to cart')
  db.saveCart(req.signedCookies.user_id, req.body.cartItemList).then((cart) => {
    res.send('successfully saved cart!');
  })
})

function cartshit(req, res, next) {
  const origin = req.get('origin');
  console.log('origin', origin);
  console.log('length: ', Object.keys(req.signedCookies).length);
  
  if(Object.keys(req.signedCookies).length === 0) {
    
    let cookie = uuidv4();
    res.cookie('user_id', cookie, {signed: true});
    
    db.saveCart(cookie, [])
    .then((cart) => {
      next();
    })
    .catch((err) => {
      console.log('error in server saveCart', err);
      next();
    })
  
  } else {
    next();
  }
}

app.get('/getcart', cartshit, (req, res) => {
  db.getCart(req.signedCookies.user_id).then((cart) => {
    res.send(cart);
  }).catch(() => {
    res.send({data:[]});
  })
})


app.listen(PORT, () => (console.log(`Listening for port: ${PORT}`)));