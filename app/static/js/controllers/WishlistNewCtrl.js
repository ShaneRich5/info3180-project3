'use strict';

(function(angular) {
	
	angular
		.module('wishlist')
		.controller('WishlistNewCtrl', 
			['$log', wishlistNewCtrl]);

	function wishlistNewCtrl($log) {
		$log.log('In WishlistNewCtrl');
	}

})(angular);