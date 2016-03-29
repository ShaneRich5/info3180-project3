'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('ItemShowCtrl', ['ItemService', '$stateParams', '$state', '$log', itemShowCtrl]);
		
	function itemShowCtrl(ItemService, $stateParams, $state, $log) {
		var userId = $stateParams.userId,
			wishlistName = $stateParams.wishlistName,
			itemId = $stateParams.itemId;

// /users/{userId}/wishlists/{wishlistName}/items/{itemId}
		ItemService.getWishlistItemById()
	}

})(angular);