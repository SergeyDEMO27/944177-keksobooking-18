'use strict';
(function () {
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var guestsOptions = guests.querySelectorAll('option');
  var roomsValues = {
    1: [2],
    2: [1, 2],
    3: [0, 1, 2],
    100: [3]
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
})();
