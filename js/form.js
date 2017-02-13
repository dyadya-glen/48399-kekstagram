'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadSelectImage = document.getElementById('upload-select-image');
  var uploadFile = document.getElementById('upload-file');
  var uploadControl = document.querySelector('.upload-control');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');

  var currentFilterClass = 'filter-none';
  var currentFilter = null;
  var needsFocus = false;

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var DEFAULT_VALUE = 100;
  var STEP_RESIZE = 25;

  window.createScale(resizeControlsDec, resizeControlsValue, STEP_RESIZE, DEFAULT_VALUE, resizesImage);
  window.createScale(resizeControlsInc, resizeControlsValue, STEP_RESIZE, DEFAULT_VALUE, resizesImage);

  function resizesImage(integerResize) {
    var resize = integerResize / DEFAULT_VALUE;
    filterImagePreview.style.transform = 'scale(' + resize + ')';
    resizeControlsValue.value = integerResize + '%';
  }

  window.initializeFilters(uploadFilterControls, selectFilter);

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

  uploadFile.addEventListener('click', onOpenPhotoForm);
  uploadFormCancel.addEventListener('click', onClosePhotoForm);
  uploadControl.addEventListener('keydown', onKeydownUploadControl);
  uploadFormCancel.addEventListener('keydown', onKeydownUploadFormCancel);

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
    if (!isEnterKey(event)) {
      return;
    }

    openPhotoForm();
    needsFocus = true;
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

    if (needsFocus) {
      uploadControl.focus();
      needsFocus = false;
    }
  }

  function toggleAriaHidden() {
    var pressed = uploadOverlay.getAttribute('aria-hidden');
    uploadOverlay.setAttribute('aria-hidden', !pressed);
  }
})();
