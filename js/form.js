'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadControl = document.querySelector('.upload-control');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;
var STEP_RESIZE = 25;

window.initializeFilters();
window.createScale(resizeControlsDec, STEP_RESIZE, resizeControlsValue);
window.createScale(resizeControlsInc, STEP_RESIZE, resizeControlsValue);

uploadFile.addEventListener('click', onOpenPhotoForm);
uploadFormCancel.addEventListener('click', onClosePhotoForm);
uploadFormCancel.addEventListener('keydown', onKeydownUploadFormCancel);
uploadControl.addEventListener('keydown', onKeydownUploadControl);

function isEnterKey(event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
}

function isEscapeKey(event) {
  return event.keyCode && event.keyCode === ESCAPE_KEY_CODE;
}

function onSetupKeydownHandler(event) {
  if (isEscapeKey(event)) {
    closePhotoForm();
  }
}

function onKeydownUploadControl(event) {
  if (isEnterKey(event)) {
    openPhotoForm();
  }
}

function onKeydownUploadFormCancel(event) {
  if (isEnterKey(event)) {
    closePhotoForm();
  }
}

function onOpenPhotoForm(event) {
  event.preventDefault();
  openPhotoForm();
}

function onClosePhotoForm(event) {
  event.preventDefault();
  closePhotoForm();
}

function openPhotoForm() {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  document.addEventListener('keydown', onSetupKeydownHandler);
  toggleAriaHidden();
}

function closePhotoForm() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  document.removeEventListener('keydown', onSetupKeydownHandler);
  toggleAriaHidden();
}

function toggleAriaHidden() {
  var pressed = uploadOverlay.getAttribute('aria-hidden');
  uploadOverlay.setAttribute('aria-hidden', !pressed);
}
