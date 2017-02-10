'use strict';

window.createScale = (function () {
  function changeScale(element, step, defaultValue) {
    var MAX_RESIZE = 100;
    var MIN_RESIZE = 25;
    var filterImagePreview = document.querySelector('.filter-image-preview');
    var resizeControlsValue = document.querySelector('.upload-resize-controls-value');

    resizeControlsValue.value = defaultValue;
    element.addEventListener('click', onResizeControls);

    function onResizeControls() {
      var integerResize = parseFloat(resizeControlsValue.value);

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

      resizesImage(integerResize);
    }

    function resizesImage(integerResize) {
      var resize = integerResize / MAX_RESIZE;
      filterImagePreview.style.transform = 'scale(' + resize + ')';
      resizeControlsValue.value = integerResize + '%';
    }
  }
  return changeScale;
})();
