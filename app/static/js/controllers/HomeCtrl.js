'use strict';

(function(angular) {
	function homeCtrl($log) {
		$log.log("HomeCtrl");
	}

	angular
		.module('wishlist')
		.controller('HomeCtrl', ['$log', homeCtrl]);
		
})(angular);