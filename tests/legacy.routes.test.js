const request = require('supertest');
const app = require('../server/app');

describe('When the root path --->', () => {
  test('receives a GET request, it should respond', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
