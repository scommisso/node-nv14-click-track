'use strict';

var msPerMinute = 60000;
module.exports = function calculateDelayInMs(bpm) {
  return msPerMinute / bpm;
};