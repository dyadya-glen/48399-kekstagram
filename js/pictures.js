'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesEl = pictureTemplate.content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  window.load('https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data', onLoad);

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function sortPicturesRandom(array) {
    var sorted = [];

    while (sorted.length < 10) {
      var element = getRandomElement(array);

      var flag = sorted.some(function (value) {
        return value === element;
      });

      if (!flag) {
        sorted.push(element);
      }
    }

    return sorted;
  }

  var sortPicturesComments = function (array) {
    var sorted = array.slice(0);
    sorted.sort(function (itemA, itemB) {
      return itemB.comments.length - itemA.comments.length;
    });

    return sorted;
  };

  function onLoad(event) {
    var target = event.target;
    var pictures = target.response;
    var fragment = document.createDocumentFragment();

    if (target.status !== 200) {
      document.write(target.status + ': ' + target.statusText);
      return;
    }

    function createsElement(picture) {
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
    }

    function changeFilter() {
      picturesContainer.innerHTML = '';
      picturesContainer.appendChild(fragment);
    }

    pictures.forEach(createsElement);

    changeFilter();

    function onFiltersElements(e) {
      var filterEl = e.target;

      if (!filterEl.classList.contains('filters-radio')) {
        return;
      }

      switch (filterEl.value) {
        case 'popular':
          pictures.forEach(createsElement);
          break;
        case 'new':
          sortPicturesRandom(pictures).forEach(createsElement);
          break;
        case 'discussed':
          sortPicturesComments(pictures).forEach(createsElement);
          break;
      }

      changeFilter();
    }

    filters.addEventListener('click', onFiltersElements);

    filters.classList.remove('hidden');
  }
})();
