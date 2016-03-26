'use strict';

(function(angular) {
	function itemShowCtrl($log) {
		$log.log('In ItemShowCtrl');
	}

	angular
		.module('wishlist')
		.controller('ItemShowCtrl', ['$log', itemShowCtrl]);
		
})(angular);