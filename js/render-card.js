'use strict';
(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderCards = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    card.offer.features.forEach(function (element) {
      var feature = document.createElement('li');
      feature.className = 'popup__feature ' + 'popup__feature--' + element;
      cardElement.querySelector('.popup__features').appendChild(feature);
    });
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').querySelector('img').src = card.offer.photos;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    return cardElement;
  };

  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCards(window.testData.testObjects[0]));

  window.renderCard = {
    fragmentCard: fragment
  };
})();
