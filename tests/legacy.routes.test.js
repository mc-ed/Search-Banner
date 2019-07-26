const request = require('supertest');
const app = require('../server/app');

describe('When the /itemlist path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/itemlist')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /getfavorite path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/getfavorite')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /removefavorite path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/removefavorite')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /savefavorite path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/savefavorite')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /getusercart path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/getusercart')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /getcart path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/getcart')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /savecart path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/savecart')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /deleteCartItem path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/deleteCartItem')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /login path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/login')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('When the /signup path --->', () => {
  test('receives a POST request, it should respond', done => {
    request(app)
      .post('/signup')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
