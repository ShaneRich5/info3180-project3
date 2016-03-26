'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('ItemShowCtrl', ['$log', itemShowCtrl]);
		
	function itemShowCtrl($log) {
		$log.log('In ItemShowCtrl');
	}

})(angular);