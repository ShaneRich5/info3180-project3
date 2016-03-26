'use strict';

(function(angular) {
	
	angular
		.module('wishlist')
		.controller('LoginCtrl', 
			['$log', loginCtrl]);


	function loginCtrl($log) {
		$log.log("In loginCrl");
	}

})(angular);