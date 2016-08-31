<<<<<<< HEAD
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

	'use strict';

	var Blanks = __webpack_require__(1);
	var Letterboard = __webpack_require__(2);
	var Man = __webpack_require__(3);
	var Score = __webpack_require__(4);
	var Check = __webpack_require__(5);
	var getWord = __webpack_require__(7);

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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var invalidAlert = __webpack_require__(6);

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
/* 6 */
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
/* 7 */
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
=======
!function(t){function n(s){if(e[s])return e[s].exports;var o=e[s]={exports:{},id:s,loaded:!1};return t[s].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";var s=e(6),o=e(21),i=e(22),r=e(7),h=e(4),c=e(8);jQuery(function(t){var n={init:function(){this.score=new r,this.bindEvents(),this.start()},bindEvents:function(){t("#guess-form").on("submit",this.submit.bind(this)),t(document).on("click","#new-round-button",this.start.bind(this)).on("hide.bs.modal","#endModal",this.start.bind(this))},start:function(){var t=this;c("http://www.setgetgo.com/randomword/get.php").then(function(n){t.answer=n,t.blanks=new s(n)},function(t){console.error("Failed!",t)}),this.guessed=[],this.incorrect=0,this.man=new i,this.letterboard=new o},submit:function(n){n.preventDefault();var e=t("#guess");this.guess=e.val().toLowerCase(),e.val(""),e.focus(),h.valid(this.guess,this.guessed)&&(this.guessed.push(this.guess),this.letterboard.print(this.guess),h.correct(this.guess,this.answer)?this.right():this.wrong())},right:function(){this.blanks.replace(this.guess),this.blanks.currentBlanks===this.answer&&(this.score.printRoundsWon(),t("#endModalLabel").html("You Win!"),t("#endModal").modal("show"))},wrong:function(){this.man.draw(this.incorrect++),7===this.incorrect&&(this.blanks.reveal(),this.score.printRoundsLost(),t("#endModalLabel").html("You Loose!"),t("#endModal").modal("show"))}};n.init()})},,,,function(t,n,e){"use strict";var s=e(5),o={valid:function(t,n){return/[a-z]/.test(t)?!(n.indexOf(t)>=0)||(s("Already guessed!"),!1):(s("Not a letter!"),!1)},correct:function(t,n){return n.indexOf(t)>=0}};t.exports=o},function(t,n){"use strict";function e(t){var n=$("#myAlert");n.text(t),n.fadeTo(400,1),n.fadeTo(800,0)}t.exports=e},function(t,n){"use strict";function e(t){this.answer=t,this.currentBlanks=this.getBlanks(),this.render()}e.prototype.getBlanks=function(){return this.answer.replace(/[a-zA-Z-]/g,"_")},e.prototype.render=function(){var t=$("#blanks");t.empty(),t.append(this.currentBlanks)},e.prototype.replace=function(t){for(var n=this.answer.indexOf(t);n>=0;)this.currentBlanks=this.currentBlanks.substr(0,n)+t+this.currentBlanks.substr(n+1),n=this.answer.indexOf(t,n+1);this.render()},e.prototype.reveal=function(){this.currentBlanks=this.answer,this.render()},t.exports=e},function(t,n){"use strict";function e(){this.roundsWon=0,this.roundsLost=0,this.$won=$("#won"),this.$lost=$("#lost"),this.printRounds()}e.prototype.printRounds=function(){this.$won.append(this.roundsWon),this.$lost.append(this.roundsLost)},e.prototype.printRoundsWon=function(){this.roundsWon++,this.$won.text(this.roundsWon)},e.prototype.printRoundsLost=function(){this.roundsLost++,this.$lost.text(this.roundsLost)},t.exports=e},function(t,n){"use strict";function e(t){return new Promise(function(n,e){var s=new XMLHttpRequest;s.open("GET",t),s.onload=function(){200===s.status?n(s.response):e(Error(s.statusText))},s.onerror=function(){e(Error("Network Error"))},s.send()})}t.exports=e},,,,,,,,,,,,,function(t,n){"use strict";function e(){this.$board=$("#letterboard"),this.$board.empty()}e.prototype.print=function(t){this.$board.prepend(t+" ")},t.exports=e},function(t,n){"use strict";function e(){this.drawOrder=[this.drawHead,this.drawTorso,this.drawLeftArm,this.drawRightArm,this.drawLeftLeg,this.drawRightLeg,this.drawNoose],this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d"),this.centerX=this.canvas.width/2,this.context.strokeStyle="#003300",this.context.lineWidth=3,this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}e.prototype.draw=function(t){this.drawOrder[t].apply(this),this.context.stroke()},e.prototype.drawHead=function(){this.context.beginPath(),this.context.arc(this.centerX,100,25,0,2*Math.PI,!1)},e.prototype.drawTorso=function(){this.context.beginPath(),this.context.moveTo(this.centerX,125),this.context.lineTo(this.centerX,200)},e.prototype.drawLeftArm=function(){this.context.beginPath(),this.context.moveTo(this.centerX,135),this.context.lineTo(140,150)},e.prototype.drawRightArm=function(){this.context.beginPath(),this.context.moveTo(this.centerX,135),this.context.lineTo(210,150)},e.prototype.drawLeftLeg=function(){this.context.beginPath(),this.context.moveTo(this.centerX,200),this.context.lineTo(140,250)},e.prototype.drawRightLeg=function(){this.context.beginPath(),this.context.moveTo(this.centerX,200),this.context.lineTo(210,250)},e.prototype.drawNoose=function(){this.context.beginPath(),this.context.moveTo(this.centerX,75),this.context.lineTo(this.centerX,25),this.context.lineTo(250,25),this.context.lineTo(250,275),this.context.moveTo(300,275),this.context.lineTo(200,275)},t.exports=e}]);
>>>>>>> 08b9814962273bae2929a254b1621c1f152ebdc3
