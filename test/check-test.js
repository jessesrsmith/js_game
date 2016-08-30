const assert = require('chai').assert;
const jsdom = require('mocha-jsdom');
const Check = require('../lib/check.js');

describe('Check', function() {

  jsdom();
  before(function () {
      $ = require('jquery');
  });

  describe('validity', function() {
    it('should return false for non-letters', function() {
      var arr = [];
      var guess = ";";
      assert.isFalse(Check.valid(guess, arr), 'non-letter char returned true');
    });

    it('should return false for letters already guessed', function() {
      var arr = ['a'];
      var guess = 'a';
      assert.isFalse(Check.valid(guess, arr), 'already guessed letter returned true');
    });

    it('should return true for letters that have not been guessed', function() {
      var arr = [];
      var guess = 'a';
      assert.isTrue(Check.valid(guess, arr), 'unguessed letter returned false');
    });
  });

  describe('correct', function() {
    it('should return true if guess is in answer', function() {
      var guess = "a";
      var answer = "happy";
      assert.isTrue(Check.correct(guess, answer));
    });

    it('should return false if guess is not in answer', function() {
      var guess = "a";
      var answer = "test";
      assert.isFalse(Check.correct(guess, answer));
    });
  });
});
