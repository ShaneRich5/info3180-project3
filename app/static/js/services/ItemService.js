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

			saveItem: function(config, data, successFn, failFn) {
				var token = config.token;

				data['user_id'] = data.userId;

				// return $http({
				// 	method: 'POST',
				// 	url: '/api/users/' + data.userId + '/wishlists/' + wishlistName + '/items',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		'auth-token': token
				// 	},
				// 	data: data
				// }).then(successFn, failFn)
			}

			// getWishlistItemById: function
		}
	}

})(angular);