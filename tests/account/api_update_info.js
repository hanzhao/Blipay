const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/update_info', () => {

  const login_data = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  it('returns 403 if the user has not logged in yet', (done) => {
    request(proxy)
      .post('/account/update_info')
      .expect(403, done);
  });

  it('returns 200 on success', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data);

    request(proxy)
      .post('/account/update_info')
      .expect(200);

    request(proxy)
      .get('/account/logout')
      .expect(200, done);
  });

});
