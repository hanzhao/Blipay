const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('POST /account/login', () => {
  
  const login_data = {
    userName: 'user3',
    loginPass: 'loginpass1'
  };

  const no_user_data = {
    userName: 'kajsfkljiregjoiewgj',
    loginPass: 'loginpass1'
  };

  const wrong_pass_data = {
    userName: 'user3',
    loginPass: 'loginpass2'
  };

  it('returns 200 on successful login', (done) => {
    request(proxy)
      .post('/account/login')
      .send(login_data)
      .expect(200, done);
  });
  
  it('returns INVALID_USERNAME_OR_PASSWORD if login \
    password is wrong', (done) => {
    request(proxy)
      .post('/account/login')
      .send(wrong_pass_data)
      .expect((res) => {
        if (res.body.code !== -1 ||
            res.body.error.type !== 'INVALID_USERNAME_OR_PASSWORD')
          throw new Error();
      })
      .expect(200, done);
  });

  it('returns USER_NOT_EXIST if userName does not exist', (done) => {
    request(proxy)
      .post('/account/login')
      .send(no_user_data)
      .expect((res) => {
        if (res.body.code !== -1 ||
            res.body.error.type !== 'USER_NOT_EXIST')
          throw new Error();
      })
      .expect(200, done);
  });

});

