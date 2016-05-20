const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/change_userName', () => {

  const user = {
    userId: 10001,
    userName: 'user1'
  };

  const userNew = {
    userId: 10003,
    userName: 'user3'
  };

  it('returns code 0 on successful user information change', (done) => {
    request(proxy)
      .post('/account/change_userName')
      .send(user)
      .expect(200, done);
  });

  it('returns code -1 if userName does not exist', (done) => {
    request(proxy)
      .post('/account/change_userName')
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
