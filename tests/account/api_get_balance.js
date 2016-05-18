const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('GET /account/get_balance', () => {

  const user = {
    userId: 10001,
  };

  const userNew = {
    userId: 10003,
  };

  const userRes = {
    code: 0,
    data: {
      code: 0,
      balance: 2
    }
  };

  const userNewRes = {
    code: -1,
    error: {
      code: -1
    } 
  };

  it('returns code 0 on successful user balance get', (done) => {
    request(proxy)
      .get('/account/get_balance')
      .query(user)
      .expect(userRes)
      .expect(200, done);
  });

  it('returns code -1 if userName does not exist', (done) => {
    request(proxy)
      .get('/account/get_balance')
      .query(userNew)
      .expect(userNewRes)
      .expect(200, done);
  });
});
