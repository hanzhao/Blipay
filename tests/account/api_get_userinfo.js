const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('GET /account/get_userinfo', () => {

  const user = {
    userId: 10001
  };

  const userNew = {
    userId: 10003
  };

  const userRes = {
    code: 0,
    data: {
      code: 0,
      userId: 10001,
      userName: 'user1',
      realName: 'realName1',
      idNumber: 'idNumber1', 
      email: 'email1', 
      phone: 'phone1'
    }
  };

  const userNewRes = {
    code: -1,
    error: {
      code: -1
    } 
  };

  it('returns code 0 on successful user information get', (done) => {
    request(proxy)
      .get('/account/get_userinfo')
      .query(user)
      .expect(userRes)
      .expect(200, done);
  });

  it('returns code -1 if userName does not exist', (done) => {
    request(proxy)
      .get('/account/get_userinfo')
      .query(userNew)
      .expect(userNewRes)
      .expect(200, done);
  });
});
