'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('WishlistShowCtrl', 
			['$log', wishlistShowCtrl]);

	function wishlistShowCtrl($log) {
		$log.log('In WishlistShowCtrl');
	}

})(angular);