'use strict';

window.initializeScale = (function () {
  return function (element, step, defaultValue, callback) {
    var valueOfImageSize = element.querySelector('.upload-resize-controls-value');
    var MAX_RESIZE = 100;
    var MIN_RESIZE = 25;

    valueOfImageSize.value = defaultValue + '%';

    callback(defaultValue / MAX_RESIZE);

    element.addEventListener('click', onResizeControls);

    function onResizeControls(event) {
      var integerResize = parseFloat(valueOfImageSize.value);
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

      var resize = integerResize / MAX_RESIZE;
      valueOfImageSize.value = integerResize + '%';

      if (typeof callback === 'function') {
        callback(resize);
      }
    }
  };
})();
