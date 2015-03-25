
(function() {
  function publishingController ($scope, sockets, publishingApi) {
      
      $scope.rowCollection = [];
      $scope.publisherItem = {};

      $scope.saveRow = function(publisher) {
        publishingApi.update(publisher);
      };

      $scope.removeRow = function(publisher) {
        var index = $scope.rowCollection.indexOf(publisher);
          if (index !== -1) {
              $scope.rowCollection.splice(index, 1);
              publishingApi.remove(publisher.id);
          }
      };

      sockets.on('publishers:new:created', function(data) {
        $scope.rowCollection.push(data);
        $scope.displayedCollection = [].concat($scope.rowCollection);
      });

      publishingApi.getAll(function(data) {
        $scope.rowCollection = data;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }); 

      $scope.addPublisher = function() {
        publishingApi.create({
          message: $scope.publisherMessage,
          imagename: $scope.publisherImageName,
          imageurl: $scope.publisherImageUrl,
          network: $scope.publisherNetwork
        });
      }
  }   

  angular
    .module('publishing', [])
    .controller('publishingController',
    ['$scope','sockets','publishingApi', publishingController]);
})();