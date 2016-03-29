'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('WishlistShowCtrl', 
			['$stateParams', '$log', wishlistShowCtrl]);

	function wishlistShowCtrl($stateParams, $log) {
		$log.log($stateParams);
		
	}

})(angular);