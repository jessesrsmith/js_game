function Score() {
  this.roundsWon = 0;
  this.roundsLost = 0;
  this.$won = $('#won');
  this.$lost = $('#lost');
  this.printRounds();
}

Score.prototype.printRounds = function() {
  this.$won.append(this.roundsWon);
  this.$lost.append(this.roundsLost);
};

Score.prototype.printRoundsWon = function() {
  this.roundsWon++;
  this.$won.text(this.roundsWon);
};

Score.prototype.printRoundsLost = function() {
  this.roundsLost++;
  this.$lost.text(this.roundsLost);
};

module.exports = Score;
