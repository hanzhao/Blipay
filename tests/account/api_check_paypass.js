const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/account');

proxy.use(router);

describe('GET /account/check_paypass', () => {

  const correctInfo = {
    userName: 'user1',
    payPass: 'paypass1'
  };

  const noUser = {
    userName: 'user3',
    payPass: 'paypass1'
  };

  const wrongPaypass = {
    userName: 'user1',
    payPass: 'paypass2'
  };

  const succRes = {
    code: 0,
    data: {
      code: 0
    }
  };

  const noUserRes = {
    code: -1,
    error: {
      code: -1
    }
  };

  const wrongPaypassRes = {
    code: -1,
    error: {
      code: -3
    }
  };

  it('returns code 0 if paypass is correct', (done) => {
    request(proxy)
      .get('/account/check_paypass')
      .query(correctInfo)
      .expect(succRes)
      .expect(200, done);
  });

  it('returns code -1 if username does not exist', (done) => {
    request(proxy)
      .get('/account/check_paypass')
      .query(noUser)
      .expect(noUserRes)
      .expect(200, done);
  });

  it('returns code -3 if paypass is wrong', (done) => {
    request(proxy)
      .get('/account/check_paypass')
      .query(wrongPaypass)
      .expect(wrongPaypassRes)
      .expect(200, done);
  });
});

