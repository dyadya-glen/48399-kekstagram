'use strict';

window.initializeFilters = function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var filterImagePreview = document.querySelector('.filter-image-preview');
  var currentFilterClass = 'filter-none';
  var currentFilter = null;
  var ENTER_KEY_CODE = 13;

  uploadFilterControls.addEventListener('click', onSelectFilter);
  uploadFilterControls.addEventListener('keydown', onKeydownUploadFilter);

  function onKeydownUploadFilter(event) {
    if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
      selectFilter(event.target);
    }
  }

  function onSelectFilter(event) {
    selectFilter(event.target);
  }

  function selectFilter(element) {
    if (!element.classList.contains('upload-filter-preview')) {
      return;
    }

    filterImagePreview.classList.remove(currentFilterClass);
    if (currentFilter) {
      currentFilter.removeAttribute('checked');
    }

    var filter = element.parentNode.previousElementSibling;
    filter.setAttribute('checked', true);

    currentFilterClass = 'filter-' + filter.value;
    currentFilter = filter;
    filterImagePreview.classList.add(currentFilterClass);
  }
};
