const request = require('supertest');
const app = require('../server/app');

describe('When the /items path --->', () => {
  test('receives a GET request, it should respond successfully -->', () => {
    return request(app)
      .get('/items')
      .expect(200);
  });

  test('receives a GET request, it should respond with an array of items -->', () => {
    return request(app)
      .get('/items')
      .expect(200)
      .then(response => {
        expect(response).toBeArray();
      });
  });

  test('receives a GET request, it should respond with an array of 10 items -->', () => {
    return request(app)
      .get('/items')
      .expect(200)
      .then(response => {
        expect(response).toBeArrayOfSize(10);
      });
  });
});

/**
 * LEGACY TESTS
 */

describe('When the /items/list path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/items/list')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
