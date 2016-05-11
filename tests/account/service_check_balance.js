const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const should = chai.should();
const Promise = require('bluebird');
const checkBalance = require('../../controllers/services/account').checkBalance;

describe('service checkBalance', function() {

  it('should resolve and return balance', () => {
    return checkBalance(1).should.eventually.equal(0);
  });
  
  it('should reject if userId is invalid', () => {
    return checkBalance(-1).should.be.rejected;
  });
  
});
