'use strict';

var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;

var ClickTrack = require('../lib/click-track');

describe('/lib/click-track', function() {

  describe('constructor', function() {

    it('defaults to 60bpm 4/4 signature', function () {

      // Use equal and deep.equal to check for strict and recursive equality

      var clickTrack = new ClickTrack();
      expect(clickTrack.bpm).to.equal(60);
      expect(clickTrack.signature).to.deep.equal({ beats: 4, beatUnit: 4 });

    });

    it('sets tempo and time signature from arguments', function () {

      var clickTrack = new ClickTrack(120, [3,4]);
      expect(clickTrack.bpm).to.equal(120);
      expect(clickTrack.signature).to.deep.equal({ beats: 3, beatUnit: 4 });

    });

  });

  describe('instance', function() {

    var clickTrack, clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      clickTrack = new ClickTrack(480, [4, 4]); //125ms interval
    });

    afterEach(function() {
      clock.restore();
    });

    describe('#start()', function () {

      it('fires "started" event with the calculated interval', function(done) {

        // Use 'done' to signal the end of an asynchronous test

        clickTrack.on('started', function (data) {
          expect(data.interval).to.equal(125);
          done();
        });
        clickTrack.start();
      });

      it('calls #stop() if track has already been started', function() {

        // Stubs can be used to mock out methods on even the subject under test

        clickTrack.stop = sinon.stub();
        clickTrack.start();
        expect(clickTrack.stop).to.not.have.been.called;
        clickTrack.start();
        expect(clickTrack.stop).to.have.been.calledOnce;
      });

      it('fires "tick" event with the correct position at the appropriate times', function() {

        // Stubs can be used for verification purposes in addition to mocking.

        var tickHandler = sinon.stub();
        clickTrack.on('tick', tickHandler);

        expect(tickHandler).to.not.have.been.called;
        clickTrack.start();
        expect(tickHandler).to.have.been.calledWithMatch({ measure: 1, beat: 1 });
        expect(tickHandler).to.have.been.calledOnce;
        clock.tick(124);
        expect(tickHandler).to.have.been.calledOnce;
        clock.tick(1);
        expect(tickHandler).to.have.been.calledWithMatch({ measure: 1, beat: 2 });
        expect(tickHandler).to.have.been.calledTwice;

        clock.tick(249);
        expect(tickHandler).to.have.been.calledWithMatch({ measure: 1, beat: 3 });
        expect(tickHandler).to.have.been.calledThrice;
        clock.tick(1);
        expect(tickHandler).to.have.been.calledWithMatch({ measure: 1, beat: 4 });
        expect(tickHandler).to.have.callCount(4);
        clock.tick(124);
        expect(tickHandler).to.have.callCount(4);
        clock.tick(1);
        expect(tickHandler).to.have.been.calledWithMatch({ measure: 2, beat: 1 });
        expect(tickHandler).to.have.callCount(5);
      });

    });

    describe('#stop()', function () {

      it('does not fire "stopped" event if track has not been started', function() {
        var stoppedHandler = sinon.stub();
        clickTrack.on('stopped', stoppedHandler);
        clickTrack.stop();
        expect(stoppedHandler).to.not.have.been.called;
      });

      it('fires "stopped" event if track has already been started', function() {
        var stoppedHandler = sinon.stub();
        clickTrack.on('stopped', stoppedHandler);
        clickTrack.start();
        expect(stoppedHandler).to.not.have.been.called;
        clickTrack.stop();
        expect(stoppedHandler).to.have.been.calledOnce;
      });

      it('stops the track', function() {
        var tickHandler = sinon.stub();
        clickTrack.on('tick', tickHandler);

        clickTrack.start();
        expect(tickHandler).to.have.been.calledOnce;
        clock.tick(125);
        expect(tickHandler).to.have.been.calledTwice;

        clickTrack.stop();
        clock.tick(1000);
        expect(tickHandler).to.have.been.calledTwice;
      });

    });

  });

});