const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/change_realName', () => {

  const user = {
    userId: 10001,
    realName: 'realName1'
  };

  const userNew = {
    userId: 10003,
    realName: 'realName3'
  };

  it('returns code 0 on successful user information change', (done) => {
    request(proxy)
      .post('/account/change_realName')
      .send(user)
      .expect({ 
        code: 0, 
        data: { 
          code: 0
        }
      })
      .expect(200, done);
  });

  it('returns code -1 if userName does not exist', (done) => {
    request(proxy)
      .post('/account/change_realName')
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
