const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const { checkBalance } = require('../../services/account');

describe('service checkBalance', () => {

  it('should resolve and return balance', () => {
    return checkBalance(10001).should.eventually.equal(271828);
  });
  
  it('should reject if userId is invalid', () => {
    return checkBalance(10002).should.be.rejected;
  });

});

