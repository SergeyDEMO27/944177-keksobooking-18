'use strict';
(function () {
  var townMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var adFields = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var ESC_KEYCODE = 27;
  var MAIN_PIN_WIDTH_DISABLED = 156;
  var MAIN_PIN_HEIGHT_DISABLED = 156;
  var MAIN_PIN_HEIGHT_ENABLED = 44;
  var MAIN_PIN_HEIGHT = 22;

  address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_DISABLED / 2);
  var defaultAdress = address.value;
  var defaultMainPinTop = mainPin.style.top;
  var defaultMainPinLeft = mainPin.style.left;

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

  var openCard = function (data) {
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinElements[0].addEventListener('click', function () {
      window.card.renderCard(data, townMap, 0);
      closeCard();
    });

    pinElements[1].addEventListener('click', function () {
      window.card.renderCard(data, townMap, 1);
      closeCard();
    });

    pinElements[2].addEventListener('click', function () {
      window.card.renderCard(data, townMap, 2);
      closeCard();
    });

    pinElements[3].addEventListener('click', function () {
      window.card.renderCard(data, townMap, 3);
      closeCard();
    });

    pinElements[4].addEventListener('click', function () {
      window.card.renderCard(data, townMap, 4);
      closeCard();
    });
  };

  var closeCard = function () {
    var closePopup = document.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      window.card.removeCard();
    });
    var card = document.querySelector('.map__card');
    card.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.card.removeCard();
      }
    });
  };

  var onSuccesHandler = function (data) {
    window.pins = data;
    window.pin.renderPins(window.filter.allFilter(window.pins), townMap);

    openCard(window.pins);
  };

  var startApp = function () {
    openMap();
    window.load(onSuccesHandler);
    mainPin.removeEventListener('click', startApp);
  };

  var onSuccess = function () {
    main.appendChild(success);

    main.addEventListener('click', function () {
      main.removeChild(success);
    });

    main.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        main.removeChild(success);
      }
    });
  };

  var onError = function () {
    main.appendChild(error);

    main.addEventListener('click', function () {
      main.removeChild(error);
    });

    main.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        main.removeChild(error);
      }
    });
  };

  adForm.addEventListener('submit', function (evt) {
    window.save(new FormData(adForm), function () {
      window.pin.removePins();
      mainPin.style.top = defaultMainPinTop;
      mainPin.style.left = defaultMainPinLeft;
      adForm.reset();
      address.value = defaultAdress;
    });
    evt.preventDefault();
  });

  mainPin.addEventListener('click', startApp);

  window.map = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
