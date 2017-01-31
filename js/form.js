'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadFilter = document.getElementById('upload-filter');
var uploadFilterAll = uploadFilter.elements['upload-filter'];
var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');

uploadFile.addEventListener('click', openPhotoForm);
uploadFormCancel.addEventListener('click', closePhotoForm);
resizeControlsDec.addEventListener('click', sizeReduction);
resizeControlsInc.addEventListener('click', sizeIncrease);

for (var j = 0; j < uploadFilterAll.length; j++) {
  attachHandlers(uploadFilterAll[j]);
}

function openPhotoForm(event) {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  removeFilter();
  filterImagePreview.classList.add('filter-none');
  resizesImage(100);
}

function closePhotoForm() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
}

function attachHandlers(control) {
  control.addEventListener('click', function () {
    removeFilter();
    filterImagePreview.classList.add('filter-' + control.value);
  });
}

function removeFilter() {
  for (var i = 0; i < uploadFilterAll.length; i++) {
    filterImagePreview.classList.remove('filter-' + uploadFilterAll[i].value);
  }
}

function sizeReduction() {
  var integerResize = parseFloat(resizeControlsValue.value);
  if (integerResize > 25) {
    integerResize -= 25;
    resizesImage(integerResize);
  }
}

function sizeIncrease() {
  var integerResize = parseFloat(resizeControlsValue.value);
  if (integerResize < 100) {
    integerResize += 25;
    resizesImage(integerResize);
  }
}

function resizesImage(integerResize) {
  var resize = integerResize / 100;
  filterImagePreview.style.transform = 'scale(' + resize + ')';
  resizeControlsValue.value = integerResize + '%';
}
