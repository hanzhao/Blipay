const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const { cookPassword } = require('../../services/account');
const crypto = require('crypto');
const { User } = require('../../models');

proxy.use(router);

describe('POST /account/change_loginpass', () => {

  /* 
   * It should be executed before the beginning of
   * whole test in account folder.
   */
  before(Promise.coroutine(function *() {
    try{
      const user = yield User.findById(10001);
      const salt = crypto.randomBytes(64).toString('base64');
      const newUser = {
        id: 10001,
        userName: 'user3',
        salt: salt,
        loginPass: cookPassword('loginpass1', salt),
        payPass: cookPassword('paypass1',  salt),
        idNumber: '314159265358979',
        balance: 271828,
        email: 'test@email.com'
      };
      if (user) {
        yield User.update(newUser, {
          where: {id: 10001}
        });
      } else {
        yield User.create(newUser);
      }
      yield User.destroy({ where: { id: 10002 }});
    } catch (err) {
      console.error('Error occurs during setting up testing environment.');
      console.error(err.message);
    }
  }));

  const change_data = {
    userId: 10001,
    loginPass: 'loginpass1'
  };

  const login_data = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  it('returns 403 if the user has not logged in yet', (done) => {
    request(proxy)
      .post('/account/change_loginpass')
      .send(change_data)
      .expect(403, done);
  });

  it('returns 200 on success', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data);

    request(proxy)
      .post('/account/change_loginpass')
      .send(change_data)
      .expect(200);

    request(proxy)
      .get('/account/logout')
      .expect(200, done);
  });

});
