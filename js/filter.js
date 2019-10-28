'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var townMap = document.querySelector('.map');

  var getHousingType = function (element) {
    return houseType.value === 'any' ? true : element.offer.type === houseType.value;
  };

  var allFilter = function (data) {
    return data.filter(function (el) {
      return getHousingType(el);
    }).slice(0, 5);
  };

  filtersForm.addEventListener('change', function () {
    window.pin.removePins();
    window.pin.renderPins(window.filter.allFilter(window.pins), townMap);
  });

  window.filter = {
    allFilter: allFilter
  };
})();
