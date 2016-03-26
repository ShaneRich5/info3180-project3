'use strict';

(function(angular) {
	function wishlistAllCtrl($log) {
		$log.log('In WishlistAllCtrl');
	}

	angular
		.module('wishlist')
		.controller('WishlistAllCtrl', ['$log', wishlistAllCtrl]);

})(angular);