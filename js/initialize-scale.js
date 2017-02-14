'use strict';

window.initializeScale = (function () {
  return function (element, step, defaultValue, callback) {
    var value = element.querySelector('.upload-resize-controls-value');

    value.value = defaultValue + '%';
    element.addEventListener('click', onResizeControls);

    function onResizeControls(event) {
      var MAX_RESIZE = 100;
      var MIN_RESIZE = 25;
      var integerResize = parseFloat(value.value);
      element = event.target;

      if (element.classList.contains('upload-resize-controls-button-inc')) {
        if (integerResize < MAX_RESIZE) {
          integerResize += step;
        }
      }

      if (element.classList.contains('upload-resize-controls-button-dec')) {
        if (integerResize > MIN_RESIZE) {
          integerResize -= step;
        }
      }

      var resize = integerResize / defaultValue;
      value.value = integerResize + '%';

      if (typeof callback === 'function') {
        callback(resize);
      }
    }
  };
})();
