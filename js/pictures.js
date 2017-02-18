'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesEl = document.querySelector('.pictures');

  window.load('https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data', onLoad);

  function onLoad(event) {
    var target = event.target;
    if (target.status !== 200) {
      document.write(target.status + ': ' + target.statusText);
      return;
    }

    var pictures = target.response;

    pictures.forEach(function (picture) {
      var content = pictureTemplate.content.cloneNode(true);

      var img = content.querySelector('img');
      img.src = picture.url;

      var likesEl = content.querySelector('.picture-likes');
      likesEl.textContent = picture.likes;

      var commentsEl = content.querySelector('.picture-comments');
      commentsEl.textContent = picture.comments.length;

      var rootEl = content.querySelector('.picture');
      rootEl.addEventListener('click', onOpen);

      function onOpen(evt) {
        evt.preventDefault();
        window.showGallery(picture);
      }

      picturesEl.appendChild(content);
    });

    document.body.appendChild(picturesEl);
  }
})();
