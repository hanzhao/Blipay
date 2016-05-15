const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/charge', () => {

  const user = {
    userName: 'user1',
    amount: 1
  };

  const userNew = {
    userName: 'user3',
    amount: 1
  };

  it('returns code 0 on successful charging', (done) => {
    request(proxy)
      .post('/account/charge')
      .send(user)
      .expect({ 
        code: 0, 
        data: { 
          code: 0,
          balance: 2
        }
      })
      .expect(200, done);
  });

  it('returns code -1 if userName exists', (done) => {
    request(proxy)
      .post('/account/charge')
      .send(userNew)
      .expect({ 
        code: -1,
        error: {
          code: -1
        } 
      })
      .expect(200, done);
  });
});
