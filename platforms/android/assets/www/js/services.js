angular.module('starter.services', [])

.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  chats=[];
  return {
    all: function() {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=7&lon=-86.85&lat=21.17&APPID=143ffc47ae963adf95c8e2a4ccf660e3&units=metric&lang=es');
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].$$hashKey === chatId) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
