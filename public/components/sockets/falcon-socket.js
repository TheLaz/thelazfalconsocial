
(function() {

	function falconSocket($rootScope) {
		
		var socket = io.connect('http://localhost:3000');
		
		var service = this;

		service.on = function (eventName, callback) {
	      
	      socket.on(eventName, function () {  
	        
	        var args = arguments;
	        
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    };

	    service.emit = function (eventName, data, callback) {

	      socket.emit(eventName, data, function () {
	        
	        var args = arguments;
	        
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      });
		};
	}

	angular
		.module('falconSockets', [])
		.service('sockets', falconSocket);

})();
