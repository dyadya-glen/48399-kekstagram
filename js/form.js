'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadSelectImage = document.getElementById('upload-select-image');
  var uploadFile = document.getElementById('upload-file');
  var uploadControl = document.querySelector('.upload-control');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var needsFocus = false;

  var DEFAULT_VALUE = 100;
  var STEP_RESIZE = 25;

  uploadFile.addEventListener('click', onOpenPhotoForm);
  uploadFormCancel.addEventListener('click', onClosePhotoForm);
  uploadControl.addEventListener('keydown', onOpenByEnter);
  uploadFormCancel.addEventListener('keydown', onCloseByEnter);

  window.initializeScale(uploadResizeControls, STEP_RESIZE, DEFAULT_VALUE, applyScale);
  window.initializeFilters(applyFilter);

  function applyFilter(property) {
    filterImagePreview.style.filter = property;
  }

  function applyScale(resize) {
    filterImagePreview.style.transform = 'scale(' + resize + ')';
  }

  function onSetupKeydownHandler(event) {
    if (window.utils.isEscapeKey(event)) {
      closePhotoForm();
    }
  }

  function onOpenByEnter(event) {
    if (!window.utils.isEnterKey(event)) {
      return;
    }

    open();
    needsFocus = true;
  }

  function onCloseByEnter(event) {
    if (window.utils.isEnterKey(event)) {
      closePhotoForm();
    }
  }

  function onOpenPhotoForm(event) {
    event.preventDefault();
    open();
  }

  function onClosePhotoForm(event) {
    event.preventDefault();
    closePhotoForm();
  }

  function open() {
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
