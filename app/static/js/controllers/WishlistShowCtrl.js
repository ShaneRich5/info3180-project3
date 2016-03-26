'use strict';

(function(angular) {
	function wishlistShowCtrl($log) {
		$log.log('In WishlistShowCtrl');
	}

	angular
		.module('wishlist')
		.controller('WishlistShowCtrl', ['$log', wishlistShowCtrl]);

})(angular);