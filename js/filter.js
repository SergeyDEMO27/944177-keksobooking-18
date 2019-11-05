'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var houseFeatures = filtersForm.querySelector('#housing-features');
  var features = houseFeatures.querySelectorAll('input');
  var townMap = document.querySelector('.map');

  var priceType = {
    MIN: 10000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MAX: 50000
  };

  var getHousingFeatures = function (element) {
    features.forEach(function (el) {
      if (el.checked) {
        element.offer.features.forEach(function (it) {
          if (el.value === it) {
            return element.offer.features;
          } else {
            return true;
          }
        });
      }
    });
  };

  var getHousingType = window.debounce(function (element) {
    return houseType.value === 'any' ? true : element.offer.type === houseType.value;
  });

  var getHousingRooms = function (element) {
    return houseRooms.value === 'any' ? true : element.offer.rooms === parseInt(houseRooms.value, 10);
  };

  var getHousingGuests = function (element) {
    return houseGuests.value === 'any' ? true : element.offer.guests === parseInt(houseGuests.value, 10);
  };

  var getHousingPrice = function (element) {
    switch (housePrice.value) {
      case priceType.LOW: return element.offer.price <= priceType.MIN;
      case priceType.MIDDLE: return element.offer.price >= priceType.MIN && element.offer.price <= priceType.MAX;
      case priceType.HIGH: return element.offer.price >= priceType.MAX;
      default: return true;
    }
  };

  var allFilter = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
              getHousingPrice(el) &&
                getHousingRooms(el) &&
                  getHousingGuests(el) &&
                    getHousingFeatures(el);
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
