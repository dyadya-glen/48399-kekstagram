'use strict';

window.initializeFilters = (function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var ENTER_KEY_CODE = 13;

  var filters = {
    none: 'none',
    chrome: 'grayscale(1)',
    sepia: 'sepia(1)',
    marvin: 'invert(100%)',
    phobos: 'contrast(1.1) brightness(1.3) saturate(2.4) sepia(0.4) hue-rotate(-240deg)',
    heat: 'contrast(1.1) brightness(1.3) saturate(2.4) sepia(0.4)'
  };

  return function (callback) {
    uploadFilterControls.addEventListener('click', onSelectFilter);
    uploadFilterControls.addEventListener('keydown', onSelectFilterByEnter);

    function onSelectFilterByEnter(event) {
      if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
        event.preventDefault();
        applyFilter(event.target);
      }
    }

    function onSelectFilter(event) {
      applyFilter(event.target);
    }

    function applyFilter(element) {
      if (!element.classList.contains('upload-filter-preview')) {
        return;
      }

      var filter = filters[element.parentNode.previousElementSibling.value];

      if (!filter) {
        return;
      }

      if (typeof callback === 'function') {
        callback(filter);
      }
    }
  };
})();
