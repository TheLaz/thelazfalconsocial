
var falcon = angular.module('reachApp', 
	['falconSockets', 'graph']);

falcon
	.constant('ENDPOINT_URI', 'http://localhost:3000/reach/')
	.controller('pageController', ['$scope']);