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

  mainPin.addEventListener('mousedown', function (evt) {
    window.renderApp();
    openMap();

    pinsMap.appendChild(window.renderPin.fragmentPin);
    pinsMap.appendChild(window.renderCard.fragmentCard);

    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';

      if (parseInt(mainPin.style.top, 10) > 630) {
        mainPin.style.top = 630 + 'px';
      } else if (parseInt(mainPin.style.top, 10) < 130) {
        mainPin.style.top = 130 + 'px';
      }
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      if (parseInt(mainPin.style.left, 10) > 1136) {
        mainPin.style.left = 1136 + 'px';
      } else if (parseInt(mainPin.style.left, 10) < 0) {
        mainPin.style.left = 0 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (mEvt) {
          mEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
        address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT_DISABLED / 2) + (MAIN_PIN_HEIGHT_ENABLED / 2) + MAIN_PIN_HEIGHT);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
    }
  });
})();
