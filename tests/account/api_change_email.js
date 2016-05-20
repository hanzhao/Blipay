const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const User = require('../../models').User;
const config = require('../../config/account');
const crypto = require('crypto');
const Promise = require('bluebird');

proxy.use(router);

describe('POST /account/change_email', () => {

  const user = {
    userId: 10001,
    email: 'email1'
  };

  const userNew = {
    userId: 10003,
    email: 'email3'
  };

  it('returns code 0 on successful user information change', (done) => {
    request(proxy)
      .post('/account/change_email')
      .send(user)
      .expect(200, done);
  });

  it('returns code -1 if userId does not exist', (done) => {
    request(proxy)
      .post('/account/change_email')
      .send(userNew)
      .expect({ 
        code: -1,
        error: {
          code: -1
        } 
      })
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
