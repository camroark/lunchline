myApp.controller('listCtrl', function(distance, Data, $scope, $http, $stateParams, $state) {
   $scope.data = [];
   $scope.userLocation = {};
   $scope.transferEvent = function(obj) {
      Data.clickedItem = obj;
      sessionStorage["tempStorage"] = JSON.stringify(obj);
   }

   $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   };

   // navigator.geolocation.getCurrentPosition(function(position) {
   //    console.log('First Geolocation called');
   //    $scope.userLocation = {
   //       lat: position.coords.latitude,
   //       long: position.coords.longitude
   //    };
   // });

   $scope.restInfo = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
         $scope.userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
         };
         Data.getData($scope.userLocation, function(fetchedData) {
            //Make a distance property for each restaurant
            for (var i = 0; i < fetchedData.length; i++) {
               var destination = {
                  lat: fetchedData[i].restaurant.geometry.location.lat,
                  long: fetchedData[i].restaurant.geometry.location.lng
               };
               fetchedData[i].restaurant.dist = distance.calc($scope.userLocation, destination);
            }
            $scope.data = fetchedData;
            $scope.contentLoading = false;
         });
      });
   }
   $scope.restInfo();
   $scope.reverse = true;
   $scope.order('restaurant.dist');
   $scope.contentLoading = true;
});