const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('GET /account/check_id', () => {

  const check_data = {
    idNumber: '314159265358979'
  };

  it('returns ID_EXIST if idNumber already exists', (done) => {
    request(proxy)
      .get('/account/check_id')
      .query(check_data)
      .expect((res) => {
        if (res.body.code !== -1)
          throw new Error();
      })
      .expect(200, done);
  });

});
