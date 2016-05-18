const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /accout/login', () => {

  /*
  const correctInfo = {
    userName: 'xxx',
    loginPass: 'xxxx1111'
  };
  */

  const wrongPassword = {
    userName: 'xxx',
    loginPass: 'xxxx111'
  };

  const noUser = {
    userName: 'jkawjkcvnjkasnk',
    loginPass: 'xxxxx'
  };

  /*
  const succRes = {
    code: 0,
    data: {
      code: 0
    }
  };
  */
  
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

  /*
  it('returns code 0 on successful login', (done) => {
    request(proxy)
      .post('/account/login')
      .send(correctInfo)
      .expect((res) => {
        if(res.data.code !== 0) {
          throw new Error('It does not return code 0.');
        }
        if(!res.data.userId) {
          throw new Error('Result does not contain userId.');
        }
      })
      .expect(200)
      .end(done);
  });
  */
  
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
