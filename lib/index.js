const Blanks = require('./draw/blanks.js');
const Letterboard = require('./draw/letterboard.js');
const Man = require('./draw/man.js');
const Score = require('./draw/score.js');
const Check = require('./check.js');
const getWord = require('./getWord.js');

jQuery(function ($) {

  var Game = {
    init: function() {
      //Initialize for all rounds
      this.score = new Score();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      $('#guess-form').on('submit', this.submit.bind(this));
      $(document)
        .on("click", "#new-round-button", this.start.bind(this))
        .on("hide.bs.modal", "#endModal", this.start.bind(this));
    },
    start: function() {
      //Get word from API
      getWord("http://www.setgetgo.com/randomword/get.php").then(response => {
        this.answer = response;
        //Set blanks object
        this.blanks = new Blanks(response);
      }, error => {
        console.error("Failed!", error);
      });
      //Initialize for new round
      this.guessed = [];
      this.incorrect = 0;
      this.man = new Man();
      this.letterboard = new Letterboard();
    },
    submit: function(e) {
      e.preventDefault();
      var $input = $('#guess');
      this.guess = $input.val().toLowerCase();
      $input.val('');
      $input.focus();
      if (Check.valid(this.guess, this.guessed)) {
        this.guessed.push(this.guess);
        this.letterboard.print(this.guess);
        if (Check.correct(this.guess, this.answer)) {
          this.right();
        } else {
          this.wrong();
        }
      }
    },
    right: function() {
      this.blanks.replace(this.guess);
      //Winner
      if(this.blanks.currentBlanks === this.answer) {
        this.score.printRoundsWon();
        $('#endModalLabel').html("You Win!");
        $('#endModal').modal('show');
      }
    },
    wrong: function() {
      this.man.draw(this.incorrect++);
      //Loser
      if (this.incorrect === 7) {
        this.blanks.reveal();
        this.score.printRoundsLost();
        $('#endModalLabel').html("You Loose!");
        $('#endModal').modal('show');
      }
    }
  };

  Game.init();
});
