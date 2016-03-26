'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('ItemAllCtrl', 
			['$log', itemAllCtrl]);

	function itemAllCtrl($log) {
		$log.log("in ItemAllCtrl");
	}

})(angular);