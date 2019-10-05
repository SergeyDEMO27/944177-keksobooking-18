'use strict';
(function () {
  var townMap = document.querySelector('.map');
  var pinsMap = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var adFields = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');

  var ENTER_KEYCODE = 13;
  var MAIN_PIN_WIDTH_DISABLED = 156;
  var MAIN_PIN_HEIGHT_DISABLED = 156;
  var MAIN_PIN_HEIGHT_ENABLED = 44;
  var MAIN_PIN_HEIGHT = 22;

  address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_DISABLED / 2);

  var getField = function (field) {
    for (var j = 0; j < field.length; j++) {
      field[j].setAttribute('disabled', 'disabled');
    }
  };
  getField(adFields);
  getField(mapForm.children);

  var openMap = function () {
    for (var j = 0; j < adFields.length; j++) {
      adFields[j].removeAttribute('disabled', 'disabled');
    }
    for (var l = 0; l < mapForm.children.length; l++) {
      mapForm.children[l].removeAttribute('disabled', 'disabled');
    }
    townMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT_DISABLED / 2) + (MAIN_PIN_HEIGHT_ENABLED / 2) + MAIN_PIN_HEIGHT);
  };

  mainPin.addEventListener('mousedown', function () {
    openMap();

    pinsMap.appendChild(window.renderPin.fragmentPin);
    pinsMap.appendChild(window.renderCard.fragmentCard);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
    }
  });
})();
