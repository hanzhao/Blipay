const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('GET /account/check_username', () => {

  const existentName = {
    userName: 'user1'
  };

  const newName = {
    userName: 'user3'
  };

  const succRes = {
    code: 0,
    data: {
      code: 0
    }
  };

  const failRes = {
    code: -1,
    error: {
      code: -1
    }
  };

  it('returns code 0 if username does not exist', (done) => {
    request(proxy)
      .get('/account/check_username')
      .query(newName)
      .expect(succRes)
      .expect(200, done);
  });

  it('returns code -1 if username already exists', (done) => {
    request(proxy)
      .get('/account/check_username')
      .query(existentName)
      .expect(failRes)
      .expect(200, done);
  });
});
