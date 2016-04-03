'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.service('ItemService', ['$http', '$log', itemService]);

	function itemService($http, $log) {
		return {
			getAll: function(successFn, failFn) {
				return $http.get('/api/items')
					.then(successFn, failFn);
			},

			getItemById: function(itemId, successFn, failFn) {
				return $http.get('/api/items/' + itemId)
					.then(successFn, failFn);
			},

			save: function(config, itemData, successFn, failFn) {
				return $http({
					method: 'POST',
					url: '/api/users/' + config.userId + '/wishlists/' + config.wishlistName + '/items',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': config.token
					},
					data: itemData
				}).then(successFn, failFn)
			}
		}
	}

})(angular);