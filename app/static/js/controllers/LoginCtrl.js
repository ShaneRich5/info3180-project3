'use strict';

(function(angular) {
	function loginCtrl($log) {
		$log.log("In loginCrl");
	}

	angular
		.module('wishlist')
		.controller('LoginCtrl', ['$log', loginCtrl]);

})(angular);