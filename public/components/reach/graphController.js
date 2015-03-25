(function() {

    function graphController($scope, sockets, graphApi) {

      $scope.graphItem = {};

      graphApi.fetch();

      sockets.on('reach:new:created', function(data) {

  		var item = {
  			 "total": data.general.value,
      		"index": data.id,
      		"Organic": data.organic.value,
      		"Paid": data.paid.value,
      		"Viral": data.viral.value
  		};

  		if(item.total) {
  			$scope.graphItem = item;
  		}
      });
    }

    angular
      .module('graph', [])
      .controller('graphController',
      ['$scope','sockets','graphApi', graphController]);

})();