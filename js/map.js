'use strict';
(function () {
  var MapBordersLimit = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: 0
  };

  var MAIN_PIN_WIDTH_DISABLED = 156;
  var MAIN_PIN_HEIGHT_DISABLED = 156;
  var MAIN_PIN_WIDTH_ENABLED = 40;
  var MAIN_PIN_HEIGHT_ENABLED = 44;
  var MAIN_PIN_HEIGHT = 22;
  var MAIN_PIN_HIDING = 1.24;

  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFields = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var filtersForm = document.querySelector('.map__filters');
  var resetBtn = document.querySelector('.ad-form__reset');
  var dragged = false;
  var startCoords = {
    x: 0,
    y: 0
  };

  address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_DISABLED / 2);
  var inactiveAdress = address.value;
  var defaultAdress = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT_DISABLED / 2) + (MAIN_PIN_HEIGHT_ENABLED / 2) + MAIN_PIN_HEIGHT);
  var defaultMainPinTop = mainPin.style.top;
  var defaultMainPinLeft = mainPin.style.left;

  var getFields = function (fields) {
    fields.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };
  getFields(adFields);
  getFields(Array.from(window.util.mapForm.children));

  var openMap = function () {
    adFields.forEach(function (item) {
      item.removeAttribute('disabled', 'disabled');
    });
    window.util.townMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = defaultAdress;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMouseMove = function (moveEvt) {
    var mapWidth = window.util.townMap.offsetWidth;
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

    if (parseInt(mainPin.style.top, 10) > MapBordersLimit.BOTTOM) {
      mainPin.style.top = MapBordersLimit.BOTTOM + 'px';
    } else if (parseInt(mainPin.style.top, 10) < MapBordersLimit.TOP) {
      mainPin.style.top = MapBordersLimit.TOP + 'px';
    }
    mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
    if (parseInt(mainPin.style.left, 10) > (mapWidth - MAIN_PIN_WIDTH_ENABLED / MAIN_PIN_HIDING)) {
      mainPin.style.left = (mapWidth - MAIN_PIN_WIDTH_ENABLED / MAIN_PIN_HIDING) + 'px';
    } else if (parseInt(mainPin.style.left, 10) < (MapBordersLimit.LEFT - MAIN_PIN_WIDTH_ENABLED / MAIN_PIN_HIDING)) {
      mainPin.style.left = (MapBordersLimit.LEFT - MAIN_PIN_WIDTH_ENABLED / MAIN_PIN_HIDING) + 'px';
    }

    address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT_DISABLED / 2) + (MAIN_PIN_HEIGHT_ENABLED / 2) + MAIN_PIN_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (dragged) {
      var onMainPinClick = function (mEvt) {
        mEvt.preventDefault();
        mainPin.removeEventListener('click', onMainPinClick);
      };
      mainPin.addEventListener('click', onMainPinClick);
    }
  };

  var onSuccesHandler = function (data) {
    window.pins = data;
    window.pin.renderPins(window.filter.getAllFilters(window.pins), window.util.townMap);
  };

  var onMainPinMousedown = function () {
    openMap();
    window.backend.load(onSuccesHandler, function () {
      getStateMessage(error);
    });
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
  };

  var getDefaultForm = function () {
    mainPin.style.top = defaultMainPinTop;
    mainPin.style.left = defaultMainPinLeft;
    adForm.reset();
    filtersForm.reset();
    window.pin.removePins();
    address.value = defaultAdress;
    window.validation.getGuestsCapacity();
    window.validation.getHousePrice();
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    getFields(adFields);
    getFields(Array.from(window.util.mapForm.children));
    window.util.townMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    address.value = inactiveAdress;
    mainPin.addEventListener('mousedown', onMainPinMousedown);
  };

  resetBtn.addEventListener('click', function (evt) {
    getDefaultForm();
    evt.preventDefault();
  });

  var onSuccessMsgClick = function () {
    main.removeChild(success);
    document.removeEventListener('click', onSuccessMsgClick);
    document.removeEventListener('keydown', onSuccessMsgKeydown);
  };

  var onSuccessMsgKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      main.removeChild(success);
      document.removeEventListener('keydown', onSuccessMsgKeydown);
      document.removeEventListener('click', onSuccessMsgClick);
    }
  };

  var onErrorsMsgClick = function () {
    main.removeChild(error);
    document.removeEventListener('click', onErrorsMsgClick);
    document.removeEventListener('keydown', onErrorMsgKeydown);
  };

  var onErrorMsgKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      main.removeChild(error);
      document.removeEventListener('keydown', onErrorMsgKeydown);
      document.removeEventListener('click', onErrorsMsgClick);
    }
  };

  var getStateMessage = function (state) {
    main.appendChild(state);

    if (state === success) {
      document.addEventListener('click', onSuccessMsgClick);
      document.addEventListener('keydown', onSuccessMsgKeydown);
    } else if (state === error) {
      document.addEventListener('click', onErrorsMsgClick);
      document.addEventListener('keydown', onErrorMsgKeydown);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      getDefaultForm();
      getStateMessage(success);
    }, function () {
      getStateMessage(error);
    });
    evt.preventDefault();
  });

  mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
