'use strict';

window.initializeFilters = (function () {
  var ENTER_KEY_CODE = 13;

  return function (controls, callback) {
    controls.addEventListener('click', onSelectFilter);
    controls.addEventListener('keydown', onKeydownUploadFilter);

    function onKeydownUploadFilter(event) {
      if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
        callback(event.target);
      }
    }

    function onSelectFilter(event) {
      if (typeof callback === 'function') {
        callback(event.target);
      }
    }
  };
})();
