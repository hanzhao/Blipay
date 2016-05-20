const request = require('supertest');
const proxy = require('./helper');
const router = require('../controllers/account');

proxy.use(router);

describe('supertest', () => {

  it('can test with HTTP request', (done) => {
    request(proxy)
      .get('/account/check_username')
      .expect({
        code: 0,
        data: {
          code: 0
        }
      })
      .expect(200, done);
  });
});
