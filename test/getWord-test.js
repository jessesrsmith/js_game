const assert = require('chai').assert;
const getWord = require('../lib/getWord.js');

describe('getWord', function() {
  
  describe('when getWord is called', function() {
    
    it('should return a promise', function() {
      var wordPromise = getWord("http://randomword.setgetgo.com/get.php");
      assert.typeOf(wordPromise, 'promise');
    });

  });
});
