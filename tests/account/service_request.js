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
    return requestReceive(1, 10).should.eventually.equal(10);
  });

  it('should reject if userId is invalid', () => {
    return requestReceive(-1, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestReceive(1, 'a').should.be.rejected;
  });
});

describe('service requestPay', function() {

  it('should resolve and return updated balance', () => {
    return requestPay(1, 10).should.eventually.equal(0);
  });
  
  it('should reject if userId is invalid', () => {
    return requestPay(-1, 10).should.be.rejected;
  });

  it('should reject if amount is not a valid number', () => {
    return requestPay(1, 'a').should.be.rejected;
  });
  
});
