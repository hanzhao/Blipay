const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');
const User = require('../../models').User;

proxy.use(router);

describe('POST /account/register', () => {

  const infoUserExist = {
    userName: 'user1',
    loginPass: 'loginpass1',
    payPass: 'paypass1'
  };

  const infoUserNew = {
    userName: 'user2',
    loginPass: 'loginpass2',
    payPass: 'paypass2'
  };

  it('returns code 0 on successful registration', (done) => {
    request(proxy)
      .post('/account/register')
      .send(infoUserNew)
      .expect({ 
        code: 0, 
        data: { 
          code: 0
        }
      })
      .expect(200, done);
  });

  it('returns code -1 if userName exists', (done) => {
    request(proxy)
      .post('/account/register')
      .send(infoUserExist)
      .expect({ 
        code: -1,
        error: {
          code: -1
        } 
      })
      .expect(200, done);
  });

  before(() => {
    User.destroy({
      where: {
        userName: 'user2'
      }
    })
  });

  after(() => {
    User.destroy({
      where: {
        userName: 'user2'
      }
    })
  });
});
