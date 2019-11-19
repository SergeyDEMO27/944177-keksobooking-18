'use strict';
(function () {
  var PinSize = {
    WIDTH: 40,
    HEIGHT: 44
  };
  var MapBordersLimit = {
    TOP: 130 - PinSize.HEIGHT,
    BOTTOM: 630 - PinSize.HEIGHT,
    LEFT: 0 - (PinSize.WIDTH / 2),
    RIGHT: window.util.townMap.offsetWidth - (PinSize.WIDTH / 2)
  };

  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFields = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var main = document.querySelector('main');
  var resetButton = document.querySelector('.ad-form__reset');
  var dragged = false;
  var startCoords = {
    x: 0,
    y: 0
  };

  var setAdressCoordinate = function (x, y) {
    var coordinateX = parseInt(x, 10) + parseInt(PinSize.WIDTH / 2, 10);
    var coordinateY = parseInt(y, 10) + PinSize.HEIGHT;
    address.value = coordinateX + ', ' + coordinateY;
  };
  setAdressCoordinate(mainPin.style.left, mainPin.style.top);

  address.value = Math.floor((parseInt(mainPin.style.left, 10) + PinSize.WIDTH / 2)) + ', ' + Math.floor((parseInt(mainPin.style.top, 10) + PinSize.HEIGHT / 2));
  var inactiveAdress = address.value;
  var defaultMainPinTop = mainPin.style.top;
  var defaultMainPinLeft = mainPin.style.left;

  var getFields = function (fields) {
    fields.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };
  getFields(adFields);
  getFields(Array.from(window.util.mapForm.children));

  var openMap = function () {
    adFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.util.townMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setAdressCoordinate(mainPin.style.left, mainPin.style.top);
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
    mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
    setAdressCoordinate(mainPin.style.left, mainPin.style.top);

    var pinPositionTop = parseInt(mainPin.style.top, 10);
    var pinPositionLeft = parseInt(mainPin.style.left, 10);

    if (pinPositionTop > MapBordersLimit.BOTTOM) {
      mainPin.style.top = MapBordersLimit.BOTTOM + 'px';
    } else if (pinPositionTop < MapBordersLimit.TOP) {
      mainPin.style.top = MapBordersLimit.TOP + 'px';
    } if (pinPositionLeft > MapBordersLimit.RIGHT) {
      mainPin.style.left = MapBordersLimit.RIGHT + 'px';
    } else if (pinPositionLeft < MapBordersLimit.LEFT) {
      mainPin.style.left = MapBordersLimit.LEFT + 'px';
    }
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

  var onSuccessLoad = function (data) {
    window.pins = data;
    window.marker.render(window.sort.render(window.pins), window.util.townMap);
  };

  var onError = function (message) {
    renderErrorMessage(message);
  };

  var onMainPinMousedown = function () {
    openMap();
    window.backend.load(onSuccessLoad, onError);
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
  };

  var getDefaultForm = function () {
    mainPin.style.top = defaultMainPinTop;
    mainPin.style.left = defaultMainPinLeft;
    adForm.reset();
    window.util.mapForm.reset();
    window.marker.delete();
    address.value = inactiveAdress;
    window.validation.getGuestsCapacity();
    window.validation.getHousePrice();
    if (document.querySelector('.map__card')) {
      window.advert.delete();
    }
    getFields(adFields);
    getFields(Array.from(window.util.mapForm.children));
    window.util.townMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    address.value = inactiveAdress;
    mainPin.addEventListener('mousedown', onMainPinMousedown);
  };

  resetButton.addEventListener('click', function (evt) {
    getDefaultForm();
    evt.preventDefault();
  });

  var onSuccessMessageClick = function () {
    main.removeChild(success);

    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessMessageKeydown);
  };

  var onErrorMessageClick = function () {
    main.removeChild(error);

    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorMessageKeydown);
  };

  var onSuccessMessageKeydown = function (evt) {
    if (window.util.isEscPressed(evt)) {
      main.removeChild(success);
      document.removeEventListener('keydown', onSuccessMessageKeydown);
      document.removeEventListener('click', onSuccessMessageClick);
    }
  };

  var onErrorMessageKeydown = function (evt) {
    if (window.util.isEscPressed(evt)) {
      main.removeChild(error);
      document.removeEventListener('keydown', onErrorMessageKeydown);
      document.removeEventListener('click', onErrorMessageClick);
    }
  };

  var renderSuccessMessage = function () {
    main.appendChild(success);

    success.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageKeydown);
  };

  var renderErrorMessage = function () {
    main.appendChild(error);

    error.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageKeydown);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), renderSuccessMessage, renderErrorMessage);
    window.marker.delete();
    getDefaultForm();
    evt.preventDefault();
  });

  mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
