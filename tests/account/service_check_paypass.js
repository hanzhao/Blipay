const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const { checkPaypass } = require('../../services/account');

describe('service checkPaypass', () => {
  
  it('should resolve and return 0', () => {
    return checkPaypass(10001, 'paypass1').should.eventually.equal(0);
  });

  it('should reject if userId is invalid', () => {
    return checkPaypass(10002, 'paypass3').should.be.rejected;
  });

  it('should reject if paypass is wrong', () => {
    return checkPaypass(10001, 'paypass3').should.be.rejected;
  });

});

