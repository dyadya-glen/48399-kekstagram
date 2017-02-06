'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadControl = document.querySelector('.upload-control');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadFilter = document.getElementById('upload-filter');
var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');
var uploadFilterAll = uploadFilter.elements['upload-filter'];
var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;
var maxResizesImage = 100;
var minResizesImage = 25;
var stepResizesImage = 25;

onClosePhotoForm();

uploadFile.addEventListener('click', onOpenPhotoForm);
uploadFormCancel.addEventListener('click', onClosePhotoForm);
resizeControlsDec.addEventListener('click', onSizeReduction);
resizeControlsInc.addEventListener('click', onSizeIncrease);
uploadFilterControls.addEventListener('click', onСhooseFilter);
uploadFilterControls.addEventListener('keydown', onKeydownUploadFilter);
uploadControl.addEventListener('keydown', onKeydownUploadControl);
uploadFormCancel.addEventListener('keydown', onKeydownUploadFormCancel);

function pressingEnter(event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
}

function pressingEscape(event) {
  return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
}

function setupKeydownHandler(event) {
  if (pressingEscape(event)) {
    onClosePhotoForm();
  }
}

function removeFilter() {
  for (var i = 0; i < uploadFilterAll.length; i++) {
    uploadFilterAll[i].removeAttribute('checked');
    filterImagePreview.classList.remove('filter-' + uploadFilterAll[i].value);
  }
}

function resizesImage(integerResize) {
  var resize = integerResize / maxResizesImage;
  filterImagePreview.style.transform = 'scale(' + resize + ')';
  resizeControlsValue.value = integerResize + '%';
}

function onСhooseFilter(event) {
  var target = event.target;
  if (target.classList.contains('upload-filter-preview')) {
    removeFilter();
    var filter = target.parentNode.previousElementSibling;
    filter.setAttribute('checked', true);
    filterImagePreview.classList.add('filter-' + filter.value);
  }
}

function onKeydownUploadControl(event) {
  if (pressingEnter(event)) {
    onOpenPhotoForm(event);
  }
}

function onKeydownUploadFormCancel(event) {
  if (pressingEnter(event)) {
    onClosePhotoForm();
  }
}

function onKeydownUploadFilter(event) {
  if (pressingEnter(event)) {
    onСhooseFilter(event);
  }
}


function onOpenPhotoForm(event) {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  removeFilter();
  filterImagePreview.classList.add('filter-none');
  resizesImage(100);
  uploadFilterAll[0].checked = true;
  document.addEventListener('keydown', setupKeydownHandler);
  if (uploadOverlay.hasAttribute('aria-hidden')) {
    uploadOverlay.setAttribute('aria-hidden', false);
  }
}

function onClosePhotoForm() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  document.removeEventListener('keydown', setupKeydownHandler);
  if (uploadOverlay.hasAttribute('aria-hidden')) {
    uploadOverlay.setAttribute('aria-hidden', true);
  }
}

function onSizeReduction() {
  var integerResize = parseFloat(resizeControlsValue.value);
  if (integerResize > minResizesImage) {
    integerResize -= stepResizesImage;
    resizesImage(integerResize);
  }
}

function onSizeIncrease() {
  var integerResize = parseFloat(resizeControlsValue.value);
  if (integerResize < maxResizesImage) {
    integerResize += stepResizesImage;
    resizesImage(integerResize);
  }
}
