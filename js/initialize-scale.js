'use strict';

window.createScale = (function () {
  return function (element, value, step, defaultValue, callback) {
    value.value = defaultValue + '%';
    element.addEventListener('click', onResizeControls);

    function onResizeControls() {
      var integerResize = parseFloat(value.value);

      if (element.classList.contains('upload-resize-controls-button-inc')) {
        if (integerResize < defaultValue) {
          integerResize += step;
        }
      }

      if (element.classList.contains('upload-resize-controls-button-dec')) {
        if (integerResize > step) {
          integerResize -= step;
        }
      }

      if (typeof callback === 'function') {
        callback(integerResize);
      }
    }
  };
})();
