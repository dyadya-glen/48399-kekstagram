'use strict';

window.utils = {
  ENTER_KEY_CODE: 13,
  ESCAPE_KEY_CODE: 27,

  isEnterKey: function (event) {
    return event.keyCode && event.keyCode === this.ENTER_KEY_CODE;
  },

  isEscapeKey: function (event) {
    return event.keyCode && event.keyCode === this.ESCAPE_KEY_CODE;
  },

  getRandomElement: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  }
};
