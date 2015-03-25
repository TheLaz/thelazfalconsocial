(function() {
	function publishingApi($http, ENDPOINT_URI) {

		var service = this;

			service.getAll = function(callback) {
				$http.get(ENDPOINT_URI + "items").success(callback);
			};

			service.create = function(publisher) {
				$http.post(ENDPOINT_URI + "create", publisher);
			};

			service.update = function(publisher) {
				$http.put(ENDPOINT_URI + "update", publisher);
			};

			service.remove = function(publisherID) {
				$http.delete(ENDPOINT_URI + "remove/" + publisherID)
			};
	}

	falcon
		.service('publishingApi', publishingApi);
})();