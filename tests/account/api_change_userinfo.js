const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/change_userinfo', () => {

  const user = {
    userName: 'user1',
    realName: 'realName1',
    idNumber: 'idNumber1',
    email: 'email1',
    phone: 'phone1'
  };

  const userNew = {
    userName: 'user3',
    idNumber: 'idNumber3',
    email: 'email3',
    phone: 'phone3'
  };

  it('returns code 0 on successful user information change', (done) => {
    request(proxy)
      .post('/account/change_userinfo')
      .send(user)
      .expect({ 
        code: 0, 
        data: { 
          code: 0
        }
      })
      .expect(200, done);
  });

  it('returns code -1 if userName exists', (done) => {
    request(proxy)
      .post('/account/change_userinfo')
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
