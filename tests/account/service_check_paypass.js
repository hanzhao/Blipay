const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const checkPaypass = require('../../controllers/services/account').checkPaypass;

describe('service checkPaypass', () => {

  it('should resolve', () => {
    return checkPaypass(5, 'paypass1').should.eventually.equal(0);
  });

  it('should reject if userId is invalid', () => {
    return checkPaypass(6666, 'paypass1').should.be.rejected;
  });

  it('should reject if paypass is wrong', () => {
    return checkPaypass(5, 'paypass3').should.be.rejected;
  });
});

