const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const login = require('../../controllers/services/account').login;

describe('service checkLoginpass', () => {

  it('should resolve if loginpass is correct', () => {
    return login('user1', 'loginpass1').should.eventually.equal(10001);
  });

  it('should reject if userName is not exist', () => {
    return login('user3', 'loginpass3').should.be.rejected;
  });

  it('should reject if loginpass is wrong', () => {
    return login('user1', 'loginpass3').should.be.rejected;
  });
});

