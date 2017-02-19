'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesEl = pictureTemplate.content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.load('https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data', onLoad);

  function onLoad(event) {
    var target = event.target;
    if (target.status !== 200) {
      document.write(target.status + ': ' + target.statusText);
      return;
    }

    var pictures = target.response;

    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      var content = picturesEl.cloneNode(true);

      content.querySelector('img').src = picture.url;
      content.querySelector('.picture-likes').textContent = picture.likes;
      content.querySelector('.picture-comments').textContent = picture.comments.length;
      content.addEventListener('click', onOpen);

      fragment.appendChild(content);


      function onOpen(evt) {
        evt.preventDefault();
        window.showGallery(picture);
      }
    });
    picturesContainer.appendChild(fragment);

  }
})();
