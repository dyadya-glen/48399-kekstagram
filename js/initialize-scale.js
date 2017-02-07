'use strict';

window.createScale = function (element, step, defaultValue) {
  var maxResizesImage = 100;
  var minResizesImage = 25;

  element.addEventListener('click', onResizeControls);

  function onResizeControls() {
    var integerResize = parseFloat(defaultValue.value);

    if (element.classList.contains('upload-resize-controls-button-inc')) {
      if (integerResize < maxResizesImage) {
        integerResize += step;
      }
    }

    if (element.classList.contains('upload-resize-controls-button-dec')) {
      if (integerResize > minResizesImage) {
        integerResize -= step;
      }
    }

    resizesImage(integerResize);
  }

  function resizesImage(integerResize) {
    var resize = integerResize / maxResizesImage;
    window.filterImagePreview.style.transform = 'scale(' + resize + ')';
    defaultValue.value = integerResize + '%';
  }
};
