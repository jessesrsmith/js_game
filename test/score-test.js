const assert = require('chai').assert;
const jsdom = require('mocha-jsdom');
const Score = require('../lib/draw/score.js');

describe('Score', function() {

  var score;

  jsdom();
  before(function () {
      $ = require('jquery');
      score = new Score();
  });

  it('should intialize rounds to zero', function() { 
    assert.equal(score.roundsWon, 0);
    assert.equal(score.roundsLost, 0);
  }); 
  
  it('should increment rounds won', function() {
    assert.equal(score.roundsWon, 0);
    score.printRoundsWon();
    assert.equal(score.roundsWon, 1);
  });

  it('should increment rounds lost', function() {
    assert.equal(score.roundsLost, 0);
    score.printRoundsLost();
    assert.equal(score.roundsLost, 1);
  });

});
