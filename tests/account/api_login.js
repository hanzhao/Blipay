const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const Promise = require('bluebird');
const crypto = require('crypto');
const config = require('../../config/account');
const User = require('../../models').User;

proxy.use(router);

describe('POST /account/login', () => {

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
      .expect(200)
      .end(done);
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

  before(Promise.coroutine(function *() {
    try{
      const loginSalt = crypto.randomBytes(64).toString('base64');
      const paySalt = crypto.randomBytes(64).toString('base64');
      const newUser = {
        id: 10001,
        userName: 'user1',
        loginSalt: loginSalt,
        loginPass: cookPassword('loginpass1', 
                                loginSalt, 
                                config.loginSaltPos),
        paySalt: paySalt,
        payPass: cookPassword('paypass1', 
                              paySalt, 
                              config.paySaltPos),
        balance: 1
      };
      yield User.create(newUser);
      yield User.destroy({
        where: {
          $or: {
            /* eslint-disable */
            id: 10002,
            id: 10003
            /* eslint-enable */
          }
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  }));

});

const cookPassword = (key, salt, saltPos) => {
  var hash = crypto.createHash('sha512');
  return hash.update(key.slice(0, saltPos))
    .update(salt)
    .update(key.slice(saltPos))
    .digest('base64');
};
