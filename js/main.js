var townMap = document.querySelector('.map');
townMap.classList.remove('map--faded');
var pinsMap = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('button');
console.log(similarPinTemplate);

var typesArray = ['palace', 'flat', 'house', 'bungalo'];
var timesArray = ['12:00', '13:00', '14:00'];
var titlesArray = ['Уютное гнездышко для пенсионеров', 'Тайное убежище для неверных', 'Приют для лысеющих холостяков', 'Каюта для пирата']
var descriptionArray = ['Ужасное жилье, но лучшее, что ты можешь себе позволить', 'Барский Терем', 'Шикарная коммуналка в центре', 'Халупа'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var requiredObjects = 8;

var getRandom = function(min, max) {
  if (max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}
else {
  return min[Math.floor(Math.random() * min.length)];
}
}

var getObjects = function (objectCount) {
  var objects = [];
  for (var i = 0; i < objectCount; i++) {
    var object = {
      "author": {
        "avatar":  'img/avatars/user0' + (i + 1) + '.png'
      },

      "offer": {
        "title": getRandom(titlesArray),
        "address": getRandom(0, 1000) + ', ' + getRandom(0, 1000),
        "price": getRandom(3000, 10000),
        "type": getRandom(typesArray),
        "rooms": getRandom(1, 5),
        "guests": getRandom(1, 10),
        "checkin": getRandom(timesArray),
        "checkout": getRandom(timesArray),
        "features": getRandom(featuresArray),
        "description": getRandom(descriptionArray),
        "photos": getRandom(photosArray)
      },

      "location": {
        "x": getRandom(0, 1200),
        "y": getRandom(130, 630)
      }
    }
    objects.push(object);
  };
  return objects
}
var objects = getObjects(requiredObjects);

var renderPins = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left:' + (pin.location.x - 20) + 'px' + ';top:' + (pin.location.y - 20) + 'px');
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  return pinElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderPins(objects[i]));
}
pinsMap.appendChild(fragment);
