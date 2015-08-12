angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Chats, Units, Cities) {
   $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?c=" + Cities.get() + "&cnt=5&lat=35&lon=139&units=" + Units.get()).success(function (data) {
      Chats.set(data.list);
      console.log(data.list);
      // Llenado del clima del día actual.
      $scope.weatherToday = Chats.getOne();
      // Llenado de la primera lista de los proximos cinco días.
      $scope.chats = Chats.all();
      });
    $scope.doRefresh = function() {
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&lat=35&lon=139&units=" + Units.get())
     .success(function(data) {
       Chats.set(data.list);
      $scope.weatherToday = Chats.getOne();
      $scope.chats = Chats.all();
     })
     .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    }
})

.controller('ChatsCtrl', function($scope, $http, Chats) {
  //Lenado de la segunda lista de los proximos cinco días.
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.weatherToday = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, Units, Cities) {
  $scope.celcius = function(){
      Units.set("metric");
  }
  $scope.fahrenheit = function(){
      Units.set("imperial");
  }
  $scope.kelvin = function(){
      Units.set("kelvin");
  }
  $scope.cancun = function(){
      Cities.set("cancun");
  }
  $scope.merida = function(){
      Cities.set("merida");
  }
});
