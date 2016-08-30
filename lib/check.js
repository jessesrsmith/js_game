const invalidAlert = require('./draw/alert.js');

var Check = {
  valid: function(guess, guessed) {
    if (!/[a-z]/.test(guess)) {
      invalidAlert("Not a letter!");
      return false;
    } else if (guessed.indexOf(guess) >= 0) {
      invalidAlert("Already guessed!");
      return false;
    } else {
      return true;
    }
  },
  correct: function(guess, answer) {
    return (answer.indexOf(guess) >= 0) ? true : false;
  }
};

module.exports = Check;
