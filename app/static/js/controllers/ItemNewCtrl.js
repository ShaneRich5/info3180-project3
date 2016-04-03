'use strict';

(function(angular) {
	
	angular
		.module('wishlist')
		.controller('ItemNewCtrl', ['$state', '$stateParams', '$scope', 'Session', 'ItemService', '$log', itemNewCtrl]);

	function itemNewCtrl($state, $stateParams, $scope, Session, ItemService, $log){
		var user = Session.getUser(),
			auth = Session.getToken(),
			wishlistName = $stateParams.wishlistName;

		$scope.saveItem = function(item) {
			if (undefined == item) {
				return;
			}

			var config = {
				token: auth.token,
				wishlistName: wishlistName,
				userId: user.userId
			}

			item['user_id'] = user.userId;
			
			item['wishlist_name'] = wishlistName;
			
			ItemService.save(config, item, 
				itemSaveSuccess, itemSaveFail);

		}

		function itemSaveSuccess(response) {
			var data = response.data;

			$log.log(response);

			$state.go('wishlists_show', {
				'userId': user.userId,
				'wishlistName': wishlistName
			});
		}

		function itemSaveFail(response) {
			$log.error("failed to save");
		}
	}
})(angular);