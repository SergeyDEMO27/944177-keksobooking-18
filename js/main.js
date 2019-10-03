'use strict';
var townMap = document.querySelector('.map');
var pinsMap = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters-container');
var mapForm = document.querySelector('.map__filters');
var adFields = adForm.querySelectorAll('fieldset');
var address = adForm.querySelector('#address');
var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');
var guestsOptions = guests.querySelectorAll('option');

var ENTER_KEYCODE = 13;
var MAIN_PIN_WIDTH_DISABLED = 156;
var MAIN_PIN_HEIGHT_DISABLED = 156;
var MAIN_PIN_HEIGHT_ENABLED = 44;
var MAIN_PIN_HEIGHT = 22;
var typesArray = ['palace', 'flat', 'house', 'bungalo'];
var timesArray = ['12:00', '13:00', '14:00'];
var titlesArray = ['Уютное гнездышко для пенсионеров', 'Тайное убежище для неверных', 'Приют для лысеющих холостяков', 'Каюта для пирата', 'Шалаш для влюбленных'];
var descriptionArray = ['Ужасное жилье, но лучшее, что ты можешь себе позволить', 'Барский Терем', 'Шикарная коммуналка в центре', 'Халупа'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var requiredObjects = 8;
var roomsValues = {
  1: [2],
  2: [1, 2],
  3: [0, 1, 2],
  100: [3]
};

address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_DISABLED / 2);

function getRandom(firstNumber, secondNumber) {
  return (Math.floor(Math.random() * (Math.floor(secondNumber) - Math.ceil(firstNumber))) + Math.ceil(firstNumber));
}

var getObjectFeatures = function () {
  var objectFeatures = [];
  for (var i = 0; i <= getRandom(1, featuresArray.length); i++) {
    objectFeatures.push(featuresArray[getRandom(0, featuresArray.length)]);
  }
  return objectFeatures;
};

var getType = function (types) {
  var type;
  switch (types) {
    case ('flat'):
      type = 'Квартира';
      break;
    case ('bungalo'):
      type = 'Бунгало';
      break;
    case ('house'):
      type = 'Дом';
      break;
    case ('palace'):
      type = 'Дворец';
      break;
  }
  return type;
};

var getObjects = function (objectCount) {
  var objects = [];
  for (var i = 0; i < objectCount; i++) {
    var object = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': titlesArray[getRandom(0, titlesArray.length)],
        'address': getRandom(0, 1000) + ', ' + getRandom(0, 1000),
        'price': getRandom(3000, 10000),
        'type': getType(typesArray[getRandom(0, typesArray.length)]),
        'rooms': getRandom(1, 5),
        'guests': getRandom(1, 10),
        'checkin': timesArray[getRandom(0, timesArray.length)],
        'checkout': timesArray[getRandom(0, timesArray.length)],
        'features': getObjectFeatures(featuresArray),
        'description': descriptionArray[getRandom(0, descriptionArray.length)],
        'photos': photosArray[getRandom(0, photosArray.length)]
      },

      'location': {
        'x': getRandom(0, 1200),
        'y': getRandom(130, 630)
      }
    };
    objects.push(object);
  }
  return objects;
};
var objects = getObjects(requiredObjects);

var renderPins = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = (pin.location.x - 20) + 'px';
  pinElement.style.top = (pin.location.y - 40) + 'px';
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var renderCards = function (card) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  card.offer.features.forEach(function (element) {
    var feature = document.createElement('li');
    feature.className = 'popup__feature ' + 'popup__feature--' + element;
    cardElement.querySelector('.popup__features').appendChild(feature);
  });
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('img').src = card.offer.photos;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderPins(objects[i]));
}
fragment.appendChild(renderCards(objects[0]));

var getField = function (field) {
  for (var j = 0; j < field.length; j++) {
    field[j].setAttribute('disabled', 'disabled');
  }
};
getField(adFields);
getField(mapForm.children);

var openMap = function () {
  for (var j = 0; j < adFields.length; j++) {
    adFields[j].removeAttribute('disabled', 'disabled');
  }
  for (var l = 0; l < mapForm.children.length; l++) {
    mapForm.children[l].removeAttribute('disabled', 'disabled');
  }
  townMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT_DISABLED / 2) + (MAIN_PIN_HEIGHT_ENABLED / 2) + MAIN_PIN_HEIGHT);
};

mainPin.addEventListener('mousedown', function () {
  openMap();

  pinsMap.appendChild(fragment);
  pinsMap.parentNode.insertBefore(fragment, mapFilters);
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

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
