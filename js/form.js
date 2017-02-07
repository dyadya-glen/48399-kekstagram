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
var stepResizesImage = 25;

onClosePhotoForm();
window.initializeFilters(uploadFilterControls, filterImagePreview, uploadFilterAll);
window.createScale(resizeControlsDec, stepResizesImage, resizeControlsValue);
window.createScale(resizeControlsInc, stepResizesImage, resizeControlsValue);

uploadFile.addEventListener('click', onOpenPhotoForm);
uploadFormCancel.addEventListener('click', onClosePhotoForm);
uploadFormCancel.addEventListener('keydown', onKeydownUploadFormCancel);
uploadControl.addEventListener('keydown', onKeydownUploadControl);

window.pressingEnter = function (event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
};

function pressingEscape(event) {
  return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
}

function setupKeydownHandler(event) {
  if (pressingEscape(event)) {
    onClosePhotoForm();
  }
}

function onKeydownUploadControl(event) {
  if (window.pressingEnter(event)) {
    onOpenPhotoForm(event);
  }
}

function onKeydownUploadFormCancel(event) {
  if (window.pressingEnter(event)) {
    onClosePhotoForm();
  }
}

function onOpenPhotoForm(event) {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  window.removeFilter(filterImagePreview, uploadFilterAll);
  filterImagePreview.classList.add('filter-none');
  resizeControlsValue.value = '100%';
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
