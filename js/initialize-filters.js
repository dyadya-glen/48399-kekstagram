'use strict';

window.initializeFilters = (function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var ENTER_KEY_CODE = 13;

  return function (callback) {
    uploadFilterControls.addEventListener('click', onSelectFilter);
    uploadFilterControls.addEventListener('keydown', onKeydownUploadFilter);

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
