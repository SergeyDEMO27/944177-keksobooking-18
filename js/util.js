'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var townMap = document.querySelector('.map');
  var mapForm = document.querySelector('.map__filters');

  window.util = {
    townMap: townMap,
    mapForm: mapForm,
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  };
})();
