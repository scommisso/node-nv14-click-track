'use strict';

var chai = require('chai');
var expect = chai.expect;

var calcDelay = require('../../lib/util/delay-calculator');

describe('/lib/util/delay-calculator', function() {

  function checkCalculation(bpm, expectedMs) {
    it('calculates delay for '+bpm+' bpm', function () {
      var result = calcDelay(bpm);
      expect(result).to.equal(expectedMs);
    });
  }

  checkCalculation(60, 1000);
  checkCalculation(120, 500);

});