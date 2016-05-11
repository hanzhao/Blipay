const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/register', () => {

  const info = {
    userName: 'xxx',
    loginPass: 'xxxx1111',
    payPass: 'xxxx22222'
  };

  /*
  it('returns code 0 on successful registration', (done) => {
    request(proxy)
      .post('/account/register')
      .send(info)
      .expect({ 
        code: 0, 
        data: { 
          code: 0
        }
      })
      .expect(200, done);
  });
  */

  it('returns code -2 if userName exists', (done) => {
    request(proxy)
      .post('/account/register')
      .send(info)
      .expect({ 
        code: -1,
        error: {
          code: -2
        } 
      })
      .expect(200, done)
  });
})
