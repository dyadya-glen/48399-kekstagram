'use strict';

window.initializeFilters = function (element, image, filters) {
  element.addEventListener('click', onСhooseFilter);
  element.addEventListener('keydown', onKeydownUploadFilter);

  function onKeydownUploadFilter(event) {
    if (window.pressingEnter(event)) {
      onСhooseFilter(event);
    }
  }

  function onСhooseFilter(event) {
    var target = event.target;
    if (target.classList.contains('upload-filter-preview')) {
      window.removeFilter(image, filters);
      var filter = target.parentNode.previousElementSibling;
      filter.setAttribute('checked', true);
      image.classList.add('filter-' + filter.value);
    }
  }
};

window.removeFilter = function (image, filters) {
  for (var i = 0; i < filters.length; i++) {
    filters[i].removeAttribute('checked');
    image.classList.remove('filter-' + filters[i].value);
  }
};
