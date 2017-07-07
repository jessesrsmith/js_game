/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	(function webpackMissingModule() { throw new Error("Cannot find module \"build\""); }());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Blanks = __webpack_require__(2);
	var Letterboard = __webpack_require__(3);
	var Man = __webpack_require__(4);
	var Score = __webpack_require__(5);
	var Check = __webpack_require__(6);
	var getWord = __webpack_require__(8);

	jQuery(function ($) {

	  var Game = {
	    init: function init() {
	      //Initialize for all rounds
	      this.score = new Score();
	      this.bindEvents();
	      this.start();
	    },
	    bindEvents: function bindEvents() {
	      $('#guess-form').on('submit', this.submit.bind(this));
	      $(document).on("click", "#new-round-button", this.start.bind(this)).on("hide.bs.modal", "#endModal", this.start.bind(this));
	    },
	    start: function start() {
	      var _this = this;

	      //Get word from API
	      getWord("http://www.setgetgo.com/randomword/get.php").then(function (response) {
	        _this.answer = response;
	        //Set blanks object
	        _this.blanks = new Blanks(response);
	      }, function (error) {
	        console.error("Failed!", error);
	      });
	      //Initialize for new round
	      this.guessed = [];
	      this.incorrect = 0;
	      this.man = new Man();
	      this.letterboard = new Letterboard();
	    },
	    submit: function submit(e) {
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
	    right: function right() {
	      this.blanks.replace(this.guess);
	      //Winner
	      if (this.blanks.currentBlanks === this.answer) {
	        this.score.printRoundsWon();
	        $('#endModalLabel').html("You Win!");
	        $('#endModal').modal('show');
	      }
	    },
	    wrong: function wrong() {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Blanks(word) {
	  this.answer = word;
	  this.currentBlanks = this.getBlanks();
	  this.render();
	}

	Blanks.prototype.getBlanks = function () {
	  return this.answer.replace(/[a-zA-Z-]/g, "_");
	};

	Blanks.prototype.render = function () {
	  var $insert = $('#blanks');
	  $insert.empty();
	  $insert.append(this.currentBlanks);
	};

	Blanks.prototype.replace = function (guess) {
	  var index = this.answer.indexOf(guess);
	  while (index >= 0) {
	    this.currentBlanks = this.currentBlanks.substr(0, index) + guess + this.currentBlanks.substr(index + 1);
	    index = this.answer.indexOf(guess, index + 1);
	  }
	  this.render();
	};

	Blanks.prototype.reveal = function () {
	  this.currentBlanks = this.answer;
	  this.render();
	};

	module.exports = Blanks;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Letterboard() {
	  this.$board = $('#letterboard');
	  this.$board.empty();
	}

	Letterboard.prototype.print = function (guess) {
	  this.$board.prepend(guess + " ");
	};

	module.exports = Letterboard;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function Man() {
	  this.drawOrder = [this.drawHead, this.drawTorso, this.drawLeftArm, this.drawRightArm, this.drawLeftLeg, this.drawRightLeg, this.drawNoose];
	  this.canvas = document.getElementById('canvas');
	  this.context = this.canvas.getContext('2d');
	  this.centerX = this.canvas.width / 2;
	  this.context.strokeStyle = '#003300';
	  this.context.lineWidth = 3;
	  //Clear canvas
	  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	Man.prototype.draw = function (numIncorrect) {
	  this.drawOrder[numIncorrect].apply(this);
	  this.context.stroke();
	};

	Man.prototype.drawHead = function () {
	  this.context.beginPath();
	  this.context.arc(this.centerX, 100, 25, 0, 2 * Math.PI, false);
	};

	Man.prototype.drawTorso = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 125);
	  this.context.lineTo(this.centerX, 200);
	};

	Man.prototype.drawLeftArm = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 135);
	  this.context.lineTo(140, 150);
	};

	Man.prototype.drawRightArm = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 135);
	  this.context.lineTo(210, 150);
	};

	Man.prototype.drawLeftLeg = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 200);
	  this.context.lineTo(140, 250);
	};

	Man.prototype.drawRightLeg = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 200);
	  this.context.lineTo(210, 250);
	};

	Man.prototype.drawNoose = function () {
	  this.context.beginPath();
	  this.context.moveTo(this.centerX, 75);
	  this.context.lineTo(this.centerX, 25);
	  this.context.lineTo(250, 25);
	  this.context.lineTo(250, 275);
	  this.context.moveTo(300, 275);
	  this.context.lineTo(200, 275);
	};

	module.exports = Man;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function Score() {
	  this.roundsWon = 0;
	  this.roundsLost = 0;
	  this.$won = $('#won');
	  this.$lost = $('#lost');
	  this.printRounds();
	}

	Score.prototype.printRounds = function () {
	  this.$won.append(this.roundsWon);
	  this.$lost.append(this.roundsLost);
	};

	Score.prototype.printRoundsWon = function () {
	  this.roundsWon++;
	  this.$won.text(this.roundsWon);
	};

	Score.prototype.printRoundsLost = function () {
	  this.roundsLost++;
	  this.$lost.text(this.roundsLost);
	};

	module.exports = Score;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var invalidAlert = __webpack_require__(7);

	var Check = {
	  valid: function valid(guess, guessed) {
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
	  correct: function correct(guess, answer) {
	    return answer.indexOf(guess) >= 0 ? true : false;
	  }
	};

	module.exports = Check;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function invalidAlert(content) {
	  var $customAlert = $('#myAlert');
	  $customAlert.text(content);
	  $customAlert.fadeTo(400, 1);
	  $customAlert.fadeTo(800, 0);
	}

	module.exports = invalidAlert;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	function getWord(url) {
	  // Return a new promise.
	  return new Promise(function (resolve, reject) {
	    // Do the usual XHR stuff
	    var req = new XMLHttpRequest();
	    req.open('GET', url);

	    req.onload = function () {
	      // This is called even on 404 etc
	      // so check the status
	      if (req.status === 200) {
	        // Resolve the promise with the response text
	        resolve(req.response);
	      } else {
	        // Otherwise reject with the status text
	        // which will hopefully be a meaningful error
	        reject(Error(req.statusText));
	      }
	    };

	    // Handle network errors
	    req.onerror = function () {
	      reject(Error("Network Error"));
	    };

	    // Make the request
	    req.send();
	  });
	}

	module.exports = getWord;

/***/ }
/******/ ]);