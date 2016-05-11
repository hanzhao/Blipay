const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const Promise = require('bluebird');

describe('chai-as-promised', function() {

  it('can test promise with expect', () => {
    expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
  });

  it('can test promise with should', () => {
    Promise.resolve(2 + 2).should.eventually.equal(4);
  });

});
