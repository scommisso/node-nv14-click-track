'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var clone = require('./util/clone');
var calcDelayInMs = require('./util/delay-calculator');

module.exports = ClickTrack;

function ClickTrack(bpm, signature) {
  this.bpm = bpm || 60;
  signature = (Array.isArray(signature) && signature.length === 2) ?  signature:  [4,4];
  this.signature = {
    beats: signature[0],
    beatUnit: signature[1]
  };
  this.waitHandle = null;
}
util.inherits(ClickTrack, EventEmitter);

ClickTrack.prototype.start = function start() {
  var self = this;

  if (self.waitHandle) {
    self.stop();
  }

  self.position = {
    measure: 1,
    beat: 1
  };
  self.interval = calcDelayInMs(self.bpm);

  self.emit('started', { interval: self.interval });
  self.emit('tick', clone(self.position));
  self.waitHandle = setInterval(function() {
    var pos = self.position;
    pos.beat++;
    if (pos.beat > self.signature.beats) {
      pos.measure++;
      pos.beat = 1;
    }
    self.emit('tick', clone(pos));
  }, self.interval);
};

ClickTrack.prototype.stop = function stop() {
  if (!this.waitHandle) { return; }
  this.emit('stopped');
  clearInterval(this.waitHandle);
};