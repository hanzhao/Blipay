const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const { requestPay, requestReceive } = require('../../services/account');

describe('service requestReceive', () => {

  it('should resolve and return transaction id', () => {
    return requestReceive(10001, 10).should.be.resolved;
  });

  it('should reject if userId is invalid', () => {
    return requestReceive(10002, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestReceive(10001, 'a').should.be.rejected;
  });

});

describe('service requestPay', function() {

  it('should resolve and return transaction id', () => {
    return requestPay(10001, 10).should.be.resolved;
  });

  it('should reject if balance is not enough', () => {
    return requestPay(10001, 2718281).should.be.rejected;
  });
  
  it('should reject if userId is invalid', () => {
    return requestPay(10002, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestPay(10001, 'a').should.be.rejected;
  });

});
