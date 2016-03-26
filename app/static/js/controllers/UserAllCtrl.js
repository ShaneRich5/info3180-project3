'use strict';

(function(angular) {
	function controller($log) {
		$log.log("In loginCrl");
	}

	angular
		.module('wishlist')
		.controller('UserAllCtrl', ['$log', controller]);

})(angular);