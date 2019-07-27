const request = require('supertest');
const app = require('../server/app');

describe('When the /items/psql path --->', () => {
  test('receives a GET request, it should respond successfully --->', () => {
    return request(app)
      .get('/items/psql')
      .expect(200);
  });

  test('receives a GET request, it should respond with an object --->', () => {
    return request(app)
      .get('/items/psql')
      .expect(200)
      .then(response => {
        expect(response.body).toBeObject();
      });
  });

  test('receives a GET request, it should respond with an item object --->', () => {
    return request(app)
      .get('/items/psql')
      .expect(200)
      .then(response => {
        expect(response.body).toBeObject();
        return response;
      })
      .then(response => {
        expect(response.body).toContainKeys([
          'id',
          'itemid',
          'itemname',
          'views',
          'category'
        ]);
      });
  });
});

describe('When the /items/psql/:id path --->', () => {
  test('receives a GET request, it should respond successfully --->', () => {
    return request(app)
      .get('/items/psql/10')
      .expect(200);
  });

  test('receives a GET request with a valid itemid, it should respond with an item object --->', () => {
    return request(app)
      .get('/items/psql/755751544')
      .expect(200)
      .then(response => {
        expect(response.body).toBeObject();
        expect(response.body).toContainKeys([
          'id',
          'itemid',
          'itemname',
          'views',
          'category'
        ]);
        expect(response.body.itemid).toEqual(755751544);
      });
  });

  test('receives a GET request with a non-existant itemid, it should respond with an empty object --->', () => {
    return request(app)
      .get('/items/psql/10')
      .expect(200)
      .then(response => {
        expect(response.body).toBeObject();
        return response;
      })
      .then(response => {
        expect(response.body).toContainKeys([]);
      });
  });
});
