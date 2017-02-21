'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesEl = pictureTemplate.content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var pictures = [];

  window.load('https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data', onLoad);

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function sortPicturesRandom(array) {
    var newArray = array.slice();
    var sorted = [];

    while (sorted.length < 10) {
      var element = getRandomElement(newArray);
      var index = sorted.indexOf(element);

      if (index === -1) {
        sorted.push(element);
      }
    }

    return sorted;
  }

  function sortPicturesComments(array) {
    var sorted = array.slice(0);
    sorted.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return sorted;
  }

  function createsElement(array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (picture) {
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

  function onLoad(event) {
    var target = event.target;
    pictures = target.response;

    if (target.status !== 200) {
      document.write(target.status + ': ' + target.statusText);
      return;
    }

    createsElement(pictures);

    filters.addEventListener('click', onFiltersElements);
  }

  filters.classList.remove('hidden');

  function onFiltersElements(e) {
    var filterEl = e.target;

    if (!filterEl.classList.contains('filters-radio')) {
      return;
    }

    picturesContainer.innerHTML = '';

    switch (filterEl.value) {
      case 'popular':
        createsElement(pictures);
        break;
      case 'new':
        createsElement(sortPicturesRandom(pictures));
        break;
      case 'discussed':
        createsElement(sortPicturesComments(pictures));
        break;
    }
  }
})();
