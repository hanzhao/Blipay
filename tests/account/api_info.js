const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const assert = require('chai').assert;

proxy.use(router);

describe('GET /account/info', () => {

  const login_data = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  it('returns 200 and empty object if the user \
    has not logged in yet', (done) => {
    request(proxy)
      .get('/account/info')
      .expect((res) => {
        assert.equal(res.body.data.user, undefined);
      })
      .expect(200, done);
  });

  it('returns 200 on success', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data);

    request(proxy)
      .get('/account/info')
      .expect((res) => {
        assert.property(res.body, 'userName');
        assert.property(res.body, 'idNumber');
      })
      .expect(200);

    request(proxy)
      .get('/account/logout')
      .expect(200, done);
  });

});
