'use strict';
(function () {
  var PriceType = {
    MIN: 10000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MAX: 50000
  };

  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var houseFeatures = filtersForm.querySelector('#housing-features').querySelectorAll('input');

  var getHousingFeatures = function (element) {
    return Array.from(houseFeatures).filter(function (item) {
      return item.checked;
    }).every(function (feature) {
      return element.offer.features.includes(feature.value);
    });
  };

  var getHousingType = function (element) {
    return houseType.value === 'any' ? true : element.offer.type === houseType.value;
  };

  var getHousingRooms = function (element) {
    return houseRooms.value === 'any' ? true : element.offer.rooms === parseInt(houseRooms.value, 10);
  };

  var getHousingGuests = function (element) {
    return houseGuests.value === 'any' ? true : element.offer.guests === parseInt(houseGuests.value, 10);
  };

  var getHousingPrice = function (element) {
    switch (housePrice.value) {
      case PriceType.LOW: return element.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE: return element.offer.price >= PriceType.MIN && element.offer.price <= PriceType.MAX;
      case PriceType.HIGH: return element.offer.price >= PriceType.MAX;
      default: return true;
    }
  };

  var getAllFilters = function (data) {
    return data.filter(function (item) {
      return getHousingType(item) &&
              getHousingPrice(item) &&
                getHousingRooms(item) &&
                  getHousingGuests(item) &&
                    getHousingFeatures(item);
    }).slice(0, 5);
  };

  var filterUpdate = window.debounce(function () {
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    window.pin.removePins();
    window.pin.renderPins(window.filter.getAllFilters(window.pins), window.util.townMap);
  });

  filtersForm.addEventListener('change', function () {
    filterUpdate();
  });

  window.filter = {
    getAllFilters: getAllFilters
  };
})();
