'use strict';
(function () {
  var PriceType = {
    MIN: 10000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MAX: 50000
  };

  var houseType = window.util.mapForm.querySelector('#housing-type');
  var housePrice = window.util.mapForm.querySelector('#housing-price');
  var houseRooms = window.util.mapForm.querySelector('#housing-rooms');
  var houseGuests = window.util.mapForm.querySelector('#housing-guests');
  var houseFeatures = window.util.mapForm.querySelector('#housing-features');

  var getHousingFeatures = function (element) {
    var houseFeaturesOnChecked = houseFeatures.querySelectorAll('input:checked');
    return Array.from(houseFeaturesOnChecked).every(function (feature) {
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

  var getFilterUpdate = window.debounce(function () {
    if (document.querySelector('.map__card')) {
      window.advert.delete();
    }
    window.marker.delete();
    window.marker.render(window.sort.render(window.pins), window.util.townMap);
  });

  window.util.mapForm.addEventListener('change', function () {
    getFilterUpdate();
  });

  window.sort = {
    render: getAllFilters
  };
})();
