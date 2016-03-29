'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('WishlistShowCtrl', 
			['$http', 'WishlistService', '$stateParams', '$log', wishlistShowCtrl]);

	function wishlistShowCtrl(WishlistService, $stateParams, $log) {
		var userId = $stateParams.userId,
			wishlistName = $stateParams.wishlistName;

		WishlistService.get(userId, wishlistName, 
			wishlistLoadedSuccess, wishlistLoadFail)
			.then(itemsLoadSuccess, itemsLoadFail);

		function wishlistLoadedSuccess(res) {
			var wishlist = res.data.wishlsit;
			$scope.wishlist = wishlist;
			$http.get('/api/users/' + userId + '/wishlists/' + wishlistName + '/items');
		}

		function itemsLoadSuccess(res) {
			var items = res.data.items;
			$scope.items = items;
		}

		function itemsLoadFail(res) {
			$log.log('Failed to load wishlist items');
		}
		
		function wishlistLoadFail(res) {
			$log.log("Failed to load wishlist");
		}
	}

})(angular);