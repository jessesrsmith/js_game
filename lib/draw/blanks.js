function Blanks(word) {
  this.answer = word;
  this.currentBlanks = this.getBlanks();
  this.render();
}

Blanks.prototype.getBlanks = function() {
  return this.answer.replace(/[a-zA-Z-]/g, "_");
};

Blanks.prototype.render = function() {
  var $insert = $('#blanks');
  $insert.empty();
  $insert.append(this.currentBlanks);
};

Blanks.prototype.replace = function(guess) {
  var index = this.answer.indexOf(guess);
  while (index >= 0) {
    this.currentBlanks = this.currentBlanks.substr(0, index) + guess + this.currentBlanks.substr(index + 1);
    index = this.answer.indexOf(guess, index + 1);
  }
  this.render();
};

Blanks.prototype.reveal = function() {
  this.currentBlanks = this.answer;
  this.render();
};

module.exports = Blanks;
