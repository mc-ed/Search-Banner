const request = require('supertest');
const app = require('../server/app');

describe('When the root path --->', () => {
  test('receives a GET request, it should respond successfully -->', () => {
    return request(app)
      .get('/')
      .expect(200);
  });
});
