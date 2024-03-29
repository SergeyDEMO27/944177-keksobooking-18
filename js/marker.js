
'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 44;

  var similarPinElement = document.querySelector('#pin').content.querySelector('button');

  var createPin = function (pin) {
    var pinElement = similarPinElement.cloneNode(true);
    var pinElementsImage = pinElement.querySelector('img');
    pinElement.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    pinElementsImage.alt = pin.offer.title;
    pinElementsImage.src = pin.author.avatar;
    pinElement.addEventListener('click', function () {
      if (document.querySelector('.map__card')) {
        window.advert.delete();
      }
      window.advert.render(pin, window.util.townMap);
    });
    return pinElement;
  };

  var renderPin = function (data, container) {
    data.forEach(function (item) {
      container.appendChild(createPin(item));
    });
    for (var l = 0; l < window.util.mapForm.children.length; l++) {
      window.util.mapForm.children[l].removeAttribute('disabled');
    }
  };

  var removePin = function () {
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinElements.forEach(function (item) {
      item.remove();
    });
  };

  window.marker = {
    render: renderPin,
    delete: removePin
  };
})();
