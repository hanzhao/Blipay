const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('chai', function() {

  it('can test with expect', function() {
    expect(2 + 2).to.equal(4);
  });

  it('can test with should', () => {
    (3 + 3).should.equal(6);
  });

});
