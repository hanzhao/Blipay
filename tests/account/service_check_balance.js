const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const checkBalance = require('../../controllers/services/account').checkBalance;

describe('service checkBalance', function() {

  it('should resolve and return balance', () => {
    return checkBalance(10001).should.eventually.equal(1);
  });
  
  it('should reject if userId is invalid', () => {
    return checkBalance(10003).should.be.rejected;
  });
  
});

