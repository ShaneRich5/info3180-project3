'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('WishlistAllCtrl', 
			['$log', wishlistAllCtrl]);

	function wishlistAllCtrl($log) {
		$log.log('In WishlistAllCtrl');
	}

})(angular);