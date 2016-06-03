const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const assert = require('chai').assert;

proxy.use(router);

describe('POST /account/topup', () => {
  
  const data = {
    password: 'paypass1',
    amount: 0
  };

  const login_data = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  const wrong_pass_data = {
    password: 'paypass2',
    amount: 0
  };

  it('returns 403 if the user has not logged in yet', (done) => {
    request(proxy)
      .post('/account/topup')
      .send(data)
      .expect(403, done);
  });

  it('returns 200 on success', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data);

    request(proxy)
      .post('/account/topup')
      .send(data)
      .expect(200);

    request(proxy)
      .get('/account/logout')
      .expect(200, done);
  });

  it('returns INCORRECT_PASSWORD if password is wrong', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data);

    request(proxy)
      .post('/account/topup')
      .send(wrong_pass_data)
      .expect((res) => {
        assert.equal(res.body.error.type, 'INCORRECT_PASSWORD');
      })
      .expect(200);

    request(proxy)
      .get('/account/logout')
      .expect(200, done);
  });
  
});
