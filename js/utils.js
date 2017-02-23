'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {
    isEnterKey: function (event) {
      return event.keyCode && event.keyCode === ENTER_KEY_CODE;
    },

    isEscapeKey: function (event) {
      return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
    },

    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  };
})();
