'use strict';

var ClickTrack = require('./lib/click-track');
var getInstance = require('./lib/instance-cache');

module.exports = getInstance;
module.exports.ClickTrack = ClickTrack;