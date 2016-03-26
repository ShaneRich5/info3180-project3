'use strict';

(function(angular) {
	function itemAllCtrl($log) {
		$log.log("in ItemAllCtrl");
	}

	angular
		.module('wishlist')
		.controller('ItemAllCtrl', ['$log', itemAllCtrl]);
})(angular);