# Hangman!

JavaScript tooling evolves at a breakneck pace. In an effort to maintain fluency with the ["state of the art"](https://medium.com/javascript-and-opinions/state-of-the-art-javascript-in-2016-ab67fc68eb0b#.o1q44mvfh), I decided to rewrite hangman using contemporary tools.  

This is a "rewrite" because I first implemented hangman as part of a web development class at the University of Pittsburgh. In that class we wrote the game in vanilla JavaScript and then wrote it again using jQuery. The point was to weigh the pros and cons of additional libraries and tooling. For this project, I refactored my old code using modern tools as a way to once again evaluate parts of the JavaScript ecosystem. 

In this version of hangman, the JS is broken down into modules that are bundled together using Webpack. ES6 features (promises, arrow functions, const, etc) are transpiled with Babel. HTML5 canvas is used for drawing the stick figure. Unit tests are handled by Mocha and Chai. The final product is hosted on AWS S3 as a static site. It can be played [here](http://jsgame.s3-website-us-west-1.amazonaws.com).  

Note: This game consumes the SetGetGo random word API. This API can return any word in the dictionary (and some that seem too obscure for Webster's). It's hangman... but really hard! Good luck.  

### If you'd like to build this game yourself:

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```

To run tests in Node:

```js
npm test
```
