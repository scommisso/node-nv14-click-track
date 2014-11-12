'use strict';

var chai = require('chai');
var expect = chai.expect;

var index = require('../index');
var getInstance = require('../lib/instance-cache');
var ClickTrack = require('../lib/click-track');

describe('/index', function() {

  it('returns the instance-cache function', function () {
    expect(index).to.be.a.function;
    expect(index).to.equal(getInstance);
  });

  it('exposes the click-track constructor', function () {
    expect(index.ClickTrack).to.be.a.function;
    expect(index.ClickTrack).to.equal(ClickTrack);
  });

});