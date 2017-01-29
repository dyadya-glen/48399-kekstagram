'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
var uploadFilterAll = uploadOverlay.querySelectorAll('input[name="upload-filter"]');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');

uploadOverlay.classList.add('invisible');

uploadSelectImage.classList.remove('invisible');

uploadFile.addEventListener('click', openPhotoForm);

uploadFormCancel.addEventListener('click', closedPhotoForm);

resizeControlsDec.addEventListener('click', sizeReduction);

resizeControlsInc.addEventListener('click', sizeIncrease);

function openPhotoForm(event) {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  resizeControlsValue.value = '100%';
  filterImagePreview.style.transform = 'scale(1)';
}

function closedPhotoForm() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
}

for (var j = 0; j < uploadFilterAll.length; j++) {
  clickControl(uploadFilterAll[j]);
}

function clickControl(control) {
  control.addEventListener('click', function () {
    closedFilters();
    openFilter(control);
  });
}

function closedFilters() {
  for (var i = 0; i < uploadFilterAll.length; i++) {
    uploadFilterAll[i].removeAttribute('checked');
    filterImagePreview.classList.remove('filter-' + uploadFilterAll[i].value);
  }
}

function openFilter(control) {
  control.setAttribute('checked', true);
  filterImagePreview.classList.add('filter-' + control.value);
}

function sizeReduction() {
  if (parseFloat(resizeControlsValue.value) > 25) {
    resizeControlsValue.value = parseFloat(resizeControlsValue.value) - 25 + '%';
  }
  var resize = parseFloat(resizeControlsValue.value) / 100;
  filterImagePreview.style.transform = 'scale(' + resize + ')';
}

function sizeIncrease() {
  if (parseFloat(resizeControlsValue.value) < 100) {
    resizeControlsValue.value = parseFloat(resizeControlsValue.value) + 25 + '%';
  }
  var resize = parseFloat(resizeControlsValue.value) / 100;
  filterImagePreview.style.transform = 'scale(' + resize + ')';
}
