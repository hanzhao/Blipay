const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const assert = require('chai').assert;

proxy.use(router);

describe('POST /account/register', () => {
  
  const data = {
    userName: 'user3',
    loginPass: 'loginpass1',
    payPass: 'paypass1'
  };

  it('returns USERNAME_EXIST if the userName already exists', (done) => {
    request(proxy)
      .post('/account/register')
      .send(data)
      .expect((res) => {
        assert.equal(res.body.error.type, 'USERNAME_EXIST')
      })
      .expect(200, done);
  });

});
