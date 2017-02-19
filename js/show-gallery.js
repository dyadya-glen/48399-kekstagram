'use strict';

window.showGallery = (function () {
  var overlay = document.querySelector('.gallery-overlay');
  var closeButton = overlay.querySelector('.gallery-overlay-close');
  var image = overlay.querySelector('.gallery-overlay-image');
  var like = overlay.querySelector('.likes-count');
  var comments = overlay.querySelector('.comments-count');

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  closeButton.addEventListener('click', onCloseGallery);
  closeButton.addEventListener('keydown', onCloseGalleryByEnter);

  function onCloseGalleryByEnter(event) {
    if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
      closeGallery();
    }
  }

  function onCloseGalleryByEscape(event) {
    if (event.keyCode && event.keyCode === ESCAPE_KEY_CODE) {
      closeGallery();
    }
  }

  function onCloseGallery() {
    closeGallery();
  }

  function closeGallery() {
    overlay.classList.add('invisible');
    document.removeEventListener('keydown', onCloseGalleryByEscape);
  }

  return function (data) {
    document.addEventListener('keydown', onCloseGalleryByEscape);
    overlay.classList.remove('invisible');
    image.src = data.url;
    like.textContent = data.likes;
    comments.textContent = data.comments.length;
    closeButton.focus();
  };
})();
