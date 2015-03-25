(function(){

	function graphApi($http, sockets, ENDPOINT_URI) {
		var service = this;

		service.getAll = function(callback) {
			$http.get(ENDPOINT_URI + "items").success(callback)
		};

		service.fetch = function() {
			$http.get(ENDPOINT_URI + "fetch");
		};
	}

	falcon.
		service('graphApi', graphApi);

})();