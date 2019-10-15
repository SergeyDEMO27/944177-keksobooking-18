'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderPins = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - 20) + 'px';
    pinElement.style.top = (pin.location.y - 40) + 'px';
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.querySelector('img').src = pin.author.avatar;
    return pinElement;
  };

  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }

    window.renderPin = {
      fragmentPin: fragment
    };
};

  var errorHandler = function (errorMessage) {
    document.body.main.appendChild(errorTemplate);
  };

  window.backendLoad(successHandler, errorHandler);
})();
