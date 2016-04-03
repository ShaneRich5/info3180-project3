'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('WishlistShowCtrl', 
			['ItemService', 'Session', '$state', '$scope', '$http', 
			'WishlistService', '$stateParams', '$log', 
			wishlistShowCtrl]);

	function wishlistShowCtrl(ItemService, Session, $state, $scope, $http, WishlistService, $stateParams, $log) {
		var userId = $stateParams.userId,
			wishlistName = $stateParams.wishlistName,
			user = Session.getUser(),
			auth = Session.getToken();

		$scope.queryUrl = function(url) {
			if (undefined == url) {
				$log.log('no url entered');
				return;
			}

			var config = {
				token: auth.token,
				wishlistName: wishlistName,
				userId: userId
			}

			var item = {
				url: url,
				// notes: notes
			}

			ItemService.save(config, item, 
				itemSaveSuccess, itemSaveFail);
		}

		$scope.addNewItem = function() {
			$state.go('items_new', {
				'userId': userId,
				'wishlistName': wishlistName
			});
		}

		WishlistService.get(userId, wishlistName, 
			wishlistLoadSuccess, wishlistLoadFail);

		function itemSaveSuccess(response) {
			$log.log(response.data);
		}

		function itemSaveFail(response) {
			$log.log('error saving item: ' + response);
		}

		function itemsLoadSuccess(res) {
			var items = res.data.items;
			$scope.items = items;
		}

		function itemsLoadFail(res) {
			$log.log('Failed to load wishlist items');
		}

		function wishlistLoadSuccess(res) {
			var wishlist = res.data.wishlist;
			$scope.wishlist = wishlist;
			$http.get('/api/users/' + userId + '/wishlists/' + wishlistName + '/items')
				.then(itemsLoadSuccess, itemsLoadFail);
		}
		
		function wishlistLoadFail(res) {
			$log.log("Failed to load wishlist");
		}
	}

})(angular);