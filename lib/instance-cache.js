'use strict';

var ClickTrack = require('./click-track');

var instances = {};
function getClickTrackByName(name, bpm, signature) {
  if (instances.hasOwnProperty(name)) {
    return instances[name];
  }
  var newTrack = new ClickTrack(bpm, signature);
  instances[name] = newTrack;
  return newTrack;
}

module.exports = getClickTrackByName;