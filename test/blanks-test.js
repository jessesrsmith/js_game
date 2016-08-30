const assert = require('chai').assert;
const jsdom = require('mocha-jsdom');
const Blanks = require('../lib/draw/blanks.js');

describe('Blanks', function() {

  var blanks;

  jsdom();
  before(function () {
    $ = require('jquery');
    blanks = new Blanks("test");
  });

  it('should return blanks equivalent to number of letters in word', function() {
    assert.equal(blanks.currentBlanks.length, 4);
  });

  it('should replace blanks with guessed letter', function() {
    blanks.replace("t");
    assert.equal(blanks.currentBlanks, "t__t");
  });

  it('should replace blanks with full word', function() {
    blanks.reveal();
    assert.equal(blanks.currentBlanks, "test");
  });
});
