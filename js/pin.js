'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');
  // var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var createPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - 20) + 'px';
    pinElement.style.top = (pin.location.y - 40) + 'px';
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.querySelector('img').src = pin.author.avatar;
    return pinElement;
  };

  var renderPins = function (data, container) {
    data.forEach(function (it) {
      container.appendChild(createPin(it));
    });
  };

  window.pin = {
    renderPins: renderPins
  };
})();
