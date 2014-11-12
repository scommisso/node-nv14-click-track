'use strict';

var sinon = require('sinon');
var chai = require('chai');
var proxyquire = require('proxyquire');
chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('/lib/instance-cache', function() {

  var fakeClickTrack, getInstance;

  beforeEach(function () {

    // Proxyquire can be used to mock out dependencies and run #require() calls
    // without using a cache.

    fakeClickTrack = sinon.stub();
    getInstance = proxyquire('../lib/instance-cache', {
      './click-track': fakeClickTrack
    });
  });

  it('creates a track with the specified tempo and time signature', function () {
    getInstance('my-song-name', 120, [3,4]);
    expect(fakeClickTrack).to.have.been.calledWithNew;
    expect(fakeClickTrack).to.have.been.calledWithMatch(120, [3,4]);
    expect(fakeClickTrack).to.have.been.calledOnce;
  });

  it('caches tracks by name', function () {
    var clickTrack = getInstance('my-song-name', 120, [3,4]);
    expect(fakeClickTrack).to.have.been.calledWithNew;
    expect(fakeClickTrack).to.have.been.calledWithMatch(120, [3,4]);
    expect(fakeClickTrack).to.have.been.calledOnce;

    var clickTrack2 = getInstance('my-song-name');
    expect(fakeClickTrack).to.have.been.calledOnce;
    expect(clickTrack2).to.equal(clickTrack);

    var clickTrack3 = getInstance('my-other-song-name', 74, [6,8]);
    expect(fakeClickTrack).to.have.been.calledWithNew;
    expect(fakeClickTrack).to.have.been.calledWithMatch(74, [6,8]);
    expect(fakeClickTrack).to.have.been.calledTwice;
    expect(clickTrack3).to.not.equal(clickTrack);
    expect(clickTrack3).to.not.equal(clickTrack2);
  });

});