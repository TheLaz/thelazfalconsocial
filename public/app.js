
var falcon = angular.module('falcon', 
	['falconSockets', 'smart-table', 'publishing']);

falcon
	.constant('ENDPOINT_URI', 'http://localhost:3000/publishers/')
	.controller('pageController', ['$scope']);