'use strict';
(function () {
  var TypePrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var guestsOptions = guests.querySelectorAll('option');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomsValues = {
    1: [2],
    2: [1, 2],
    3: [0, 1, 2],
    100: [3]
  };

  var getGuestsCapacity = function () {
    guestsOptions[2].selected = true;
    guestsOptions.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
    Object.keys(roomsValues).forEach(function (item) {
      if (item === rooms.value) {
        roomsValues[item].forEach(function (element) {
          guestsOptions[element].removeAttribute('disabled');
        });
      }
    });
  };
  getGuestsCapacity();

  rooms.addEventListener('change', function () {
    getGuestsCapacity();
  });

  var getHousePrice = function () {
    Object.keys(TypePrices).forEach(function (item) {
      if (item === (type.value).toUpperCase()) {
        price.min = TypePrices[item];
        price.placeholder = TypePrices[item];
      }
    });
  };
  getHousePrice();

  type.addEventListener('change', function () {
    getHousePrice();
  });

  var getTime = function (firstTime, secondTime) {
    firstTime.addEventListener('change', function () {
      secondTime.value = firstTime.value;
    });
  };
  getTime(timeIn, timeOut);
  getTime(timeOut, timeIn);

  window.validation = {
    getGuestsCapacity: getGuestsCapacity,
    getHousePrice: getHousePrice
  };
})();
