var assert = require('assert');
var bothmath = require('../botmath.js');

describe('botmath', function() {
  describe('sum', function () {
    it('should return sum of 2 values', function () {
      assert.equal(-2, bothmath.sum(-2, 0));
	  assert.equal(1, bothmath.sum(-1, 2));
	  assert.equal(6.5, bothmath.sum(3.5, 3));
	  assert.equal(1337, bothmath.sum(1338.2, -1.2));
    })
	it('should return NaN if both values are not numeric', function () {
		assert.ok(isNaN(bothmath.sum(1335, 'a')));
	});
  });
});
