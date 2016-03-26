'use strict';

(function(angular){
	function userShowCtrl($log) {
		$log.log('In UserShowCtrl');
	}

	angular
		.module('wishlist')
		.controller('UserShowCtrl', ['$log', userShowCtrl]);
})(angular);