const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/withdraw', () => {

  const user = {
    userId: 10001,
    amount: 1
  };

  const userNew = {
    userId: 10003,
    amount: 1
  };

  const userNotEnough = {
    userId: 10001,
    amount: 6666
  };

  it('returns code 0 on successful withdraw', (done) => {
    request(proxy)
      .post('/account/withdraw')
      .send(user)
      .expect({ 
        code: 0, 
        data: { 
          code: 0,
          balance: 1
        }
      })
      .expect(200, done);
  });

  it('returns code -1 if userName exists', (done) => {
    request(proxy)
      .post('/account/withdraw')
      .send(userNew)
      .expect({ 
        code: -1,
        error: {
          code: -1
        } 
      })
      .expect(200, done);
  });

  it('returns code -3 if balance is not enough', (done) => {
    request(proxy)
      .post('/account/withdraw')
      .send(userNotEnough)
      .expect({ 
        code: -1,
        error: {
          code: -3
        } 
      })
      .expect(200, done);
  });
});
