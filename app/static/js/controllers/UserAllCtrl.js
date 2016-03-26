'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('UserAllCtrl', 
			['$log', userAllCtrl]);

	function userAllCtrl($log) {
		$log.log("In loginCrl");
	}

})(angular);