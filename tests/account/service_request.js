const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const requestPay = require('../../controllers/services/account').requestPay;
const requestReceive = require(
  '../../controllers/services/account'
).requestReceive;

describe('service requestReceive', () => {

  it('should resolve and return updated balance', () => {
    return requestReceive(5, 10).should.eventually.equal(11);
  });

  it('should reject if userId is invalid', () => {
    return requestReceive(6666, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestReceive(5, 'a').should.be.rejected;
  });
});

describe('service requestPay', function() {

  it('should resolve and return updated balance', () => {
    return requestPay(5, 10).should.eventually.equal(1);
  });

  it('should reject if balance is not enough', () => {
    return requestPay(5, 6666).should.be.rejected;
  });
  
  it('should reject if userId is invalid', () => {
    return requestPay(6666, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestPay(5, 'a').should.be.rejected;
  });
  
});
