'use strict';
(function () {
  var CARD_IMG_WIDTH = 45;
  var CARD_IMG_HEIGHT = 40;

  var similarCardElement = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (card) {
    var cardElement = similarCardElement.cloneNode(true);
    var cardElementsFeatures = cardElement.querySelector('.popup__features');
    var cardElementsPhotos = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElementsFeatures.innerHTML = '';
    card.offer.features.forEach(function (element) {
      var feature = document.createElement('li');
      feature.className = 'popup__feature ' + 'popup__feature--' + element;
      cardElementsFeatures.appendChild(feature);
    });
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElementsPhotos.innerHTML = '';
    card.offer.photos.forEach(function (item) {
      var photo = document.createElement('img');
      photo.className = 'popup__photo';
      photo.setAttribute('width', CARD_IMG_WIDTH);
      photo.setAttribute('height', CARD_IMG_HEIGHT);
      photo.alt = 'Фотография жилья';
      photo.src = item;
      cardElementsPhotos.appendChild(photo);
    });
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.remove();
    });
    document.addEventListener('keydown', onCardsElementKeydown);
    return cardElement;
  };

  var onCardsElementKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      if (document.querySelector('.map__card')) {
        removeCardsElement();
      }
      document.removeEventListener('keydown', onCardsElementKeydown);
    }
  };

  var renderCardsElement = function (data, container) {
    container.appendChild(createCard(data));
  };

  var removeCardsElement = function () {
    var cardElement = document.querySelector('.map__card');
    cardElement.remove();
  };

  window.card = {
    renderCard: renderCardsElement,
    removeCard: removeCardsElement
  };
})();
