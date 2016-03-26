'use strict';

(function(angular){

	angular
		.module('wishlist')
		.controller('UserShowCtrl', 
			['$log', userShowCtrl]);

	function userShowCtrl($log) {
		$log.log('In UserShowCtrl');
	}

})(angular);