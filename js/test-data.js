'use strict';
(function () {
  var typesArray = ['palace', 'flat', 'house', 'bungalo'];
  var timesArray = ['12:00', '13:00', '14:00'];
  var titlesArray = ['Уютное гнездышко для пенсионеров', 'Тайное убежище для неверных', 'Приют для лысеющих холостяков', 'Каюта для пирата', 'Шалаш для влюбленных'];
  var descriptionArray = ['Ужасное жилье, но лучшее, что ты можешь себе позволить', 'Барский Терем', 'Шикарная коммуналка в центре', 'Халупа'];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var requiredObjects = 8;

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

  window.testData = {
    testObjects: objects
  };
})();
