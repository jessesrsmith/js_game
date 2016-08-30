function Letterboard() {
  this.$board = $('#letterboard');
  this.$board.empty();
}

Letterboard.prototype.print = function(guess) {
  this.$board.prepend(guess + " ");
};

module.exports = Letterboard;
