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

  var onSuccesHandler = function (data) {
    window.pins = data;
    window.pin.renderPins(window.filter.allFilter(window.pins), townMap);
  };

  var startApp = function () {
    openMap();
    window.load(onSuccesHandler);
    mainPin.removeEventListener('click', startApp);
  };

  var getDefaultForm = function () {
    mainPin.style.top = defaultMainPinTop;
    mainPin.style.left = defaultMainPinLeft;
    adForm.reset();
    address.value = defaultAdress;
  };

  var removeSuccess = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      main.removeChild(success);
      main.removeEventListener('keydown', removeSuccess);
    }
  };

  var removeError = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      main.removeChild(error);
      main.removeEventListener('keydown', removeError);
    }
  };

  var stateMessage = function (state) {
    main.appendChild(state);

    state.addEventListener('click', function () {
      main.removeChild(state);
    });

    if (state === success) {
      main.addEventListener('keydown', removeSuccess);
    } else if (state === error) {
      main.addEventListener('keydown', removeError);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.save(new FormData(adForm), function () {
      window.pin.removePins();
      getDefaultForm();
      stateMessage(success);
    }, function () {
      stateMessage(error);
    });
    evt.preventDefault();
  });

  mainPin.addEventListener('click', startApp);

})();
