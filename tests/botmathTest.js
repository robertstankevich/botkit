var assert = require('assert');
var bothmath = require('../botmath.js');

describe('botmath', function() {
  describe('sum', function () {
        it('should return sum of 2 values', function () {
            assert.equal(-2, bothmath.sum(-2, 0));
            assert.equal(1, bothmath.sum(-1, 2));
            assert.equal(6.5, bothmath.sum(3.5, 3));
            assert.equal(1337, bothmath.sum(1338.2, -1.2));
        });
        it('should return NaN if both values are not numeric', function () {
            assert.ok(isNaN(bothmath.sum(1335, 'a')));
        });
    }),
  describe('isPrime', function () {
      it('should return true', function () {
          assert(bothmath.isPrime(2));
          assert(bothmath.isPrime(3));
          assert(bothmath.isPrime(5));
          assert(bothmath.isPrime(7));
          assert(!bothmath.isPrime(22));
      });
  }),
  describe('calculateFibonacciUpto', function () {
      it('Tests calculateFibonacciUpto', function () {
          assert.deepEqual([1,1,2,3,5], bothmath.calculateFibonacciUpto(8));
      });
  });
});
