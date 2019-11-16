'use strict';
(function () {
  var timeoutInterval = 10000; // ms

  var createXMLHttpRequest = function (address, method, onLoad, onError, data) {
    var URL = address;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeoutInterval;

    xhr.open(method, URL);
    xhr.send(data);
  };

  var save = function (data, onLoad, onError) {
    createXMLHttpRequest('https://js.dump.academy/keksobooking', 'POST', onLoad, onError, data);
  };

  var load = function (onLoad, onError) {
    createXMLHttpRequest('https://js.dump.academy/keksobooking/data', 'GET', onLoad, onError);
  };

  window.backend = {
    save: save,
    load: load
  };
})();
