'use strict';

var chai = require('chai');
var expect = chai.expect;

var clone = require('../../lib/util/clone');

describe('/lib/util/delay-calculator', function() {

  it('successfully clones an object', function () {
    var val = {
      a: 123,
      b: 'val'
    };

    var copy = clone(val);

    expect(Object.keys(copy)).to.deep.equal(Object.keys(val));
    expect(copy.a).to.equal(val.a);
    expect(copy.b).to.equal(val.b);
  });

  it('returns original value if object is a number', function () {
    expect(clone(12345)).to.equal(12345);
  });

  it('returns original value if object is a string', function () {
    expect(clone('stringVal')).to.equal('stringVal');
  });

  it('returns null if object is null', function () {
    expect(clone(null)).to.be.null;
  });

  it('returns undefined if object is undefined', function () {
    expect(clone(undefined)).to.be.undefined;
  });

});