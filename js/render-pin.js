'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');

  var renderPins = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - 20) + 'px';
    pinElement.style.top = (pin.location.y - 40) + 'px';
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.querySelector('img').src = pin.author.avatar;
    return pinElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.testData.testObjects.length; i++) {
    fragment.appendChild(renderPins(window.testData.testObjects[i]));
  }

  window.renderPin = {
    fragmentPin: fragment
  };
})();
