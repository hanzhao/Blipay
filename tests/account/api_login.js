const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /accout/login', () => {

  const correctInfo = {
    userName: 'user1',
    loginPass: 'loginpass1'
  };

  const wrongPassword = {
    userName: 'user1',
    loginPass: 'loginpass2'
  };

  const noUser = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  const succRes = {
    code: 0,
    data: {
      code: 0,
      userId: 5
    }
  };
  
  const noUserRes = {
    code: -1,
    error: {
      code: -1
    }
  };

  const wrongPassRes = {
    code: -1,
    error: {
      code: -3
    }
  };

  it('returns code 0 on successful login', (done) => {
    request(proxy)
      .post('/account/login')
      .send(correctInfo)
      .expect(succRes)
      .expect(200, done);
  });
  
  it('returns code -3 if login password is wrong', (done) => {
    request(proxy)
      .post('/account/login')
      .send(wrongPassword)
      .expect(wrongPassRes)
      .expect(200, done);
  });

  it('returns code -1 if userName does not exist', (done) => {
    request(proxy)
      .post('/account/login')
      .send(noUser)
      .expect(noUserRes)
      .expect(200, done);
  });

});
