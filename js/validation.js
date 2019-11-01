'use strict';
(function () {
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
  var typePrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var timeValues = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  rooms.addEventListener('change', function () {
    guestsOptions.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
    for (var j = 0; j < rooms.length; j++) {
      if (Object.keys(roomsValues)[j] === rooms.value) {
        Object.values(roomsValues)[j].forEach(function (element) {
          guestsOptions[element].removeAttribute('disabled', 'disabled');
        });
      }
    }
  });

  type.addEventListener('change', function () {
    for (var i = 0; i < type.length; i++) {
      if (Object.keys(typePrices)[i] === type.value) {
        price.min = Object.values(typePrices)[i];
        price.placeholder = Object.values(typePrices)[i];
      }
    }
  });

  // timeIn.addEventListener('change', function () {
  //   for (var i = 0; i < timeIn.length; i++) {
  //   if (Object.keys(timeValues)[i] === timeIn.value) {
  //     timeOut.value = Object.values(timeValues)[i];
  //     }
  //   }
  // });

  var time = function (firstTime, secondTime) {
    firstTime.addEventListener('change', function () {
      for (var i = 0; i < firstTime.length; i++) {
        if (Object.keys(timeValues)[i] === firstTime.value) {
          secondTime.value = Object.values(timeValues)[i];
        }
      }
    });
  };

  time(timeIn, timeOut);
  time(timeOut, timeIn);

})();
