'use strict';
var townMap = document.querySelector('.map');
var pinsMap = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');
var adForm = document.querySelector('.ad-form');
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

address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH_DISABLED / 2) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_DISABLED / 2);

function getRandom(firstNumber, secondNumber) {
  return (Math.floor(Math.random() * (Math.floor(secondNumber) - Math.ceil(firstNumber))) + Math.ceil(firstNumber));
}

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
        'type': typesArray[getRandom(0, typesArray.length)],
        'rooms': getRandom(1, 5),
        'guests': getRandom(1, 10),
        'checkin': timesArray[getRandom(0, timesArray.length)],
        'checkout': timesArray[getRandom(0, timesArray.length)],
        'features': featuresArray[getRandom(0, featuresArray.length)],
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderPins(objects[i]));
}
pinsMap.appendChild(fragment);

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
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

rooms.addEventListener('change', function () {
  if (rooms.value === '1') {
    guestsOptions[0].setAttribute('disabled', 'disabled');
    guestsOptions[1].setAttribute('disabled', 'disabled');
    guestsOptions[2].removeAttribute('disabled', 'disabled');
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else if (rooms.value === '2') {
    guestsOptions[0].setAttribute('disabled', 'disabled');
    guestsOptions[1].removeAttribute('disabled', 'disabled');
    guestsOptions[2].removeAttribute('disabled', 'disabled');
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else if (rooms.value === '3') {
    guestsOptions[0].removeAttribute('disabled', 'disabled');
    guestsOptions[1].removeAttribute('disabled', 'disabled');
    guestsOptions[2].removeAttribute('disabled', 'disabled');
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else if (rooms.value === '100') {
    guestsOptions[0].setAttribute('disabled', 'disabled');
    guestsOptions[1].setAttribute('disabled', 'disabled');
    guestsOptions[2].setAttribute('disabled', 'disabled');
    guestsOptions[3].removeAttribute('disabled', 'disabled');
  }
});
