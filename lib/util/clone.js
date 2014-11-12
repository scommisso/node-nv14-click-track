'use strict';

module.exports = function clone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  var copy = value.constructor();
  var keys = Object.keys(value);
  keys.forEach(function (key) {
    copy[key] = value[key];
  });

  return copy;
};