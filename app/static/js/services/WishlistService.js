'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.service('WishlistService', ['$http', '$log', '$resource', wishlistService]);

	function wishlistService($http, $log, $resource) {

		return {
			all: function(userId, successFn, failFn) {
				return $http.get('/api/users/' + userId + '/wishlists')
					.then(successFn, failFn);
			},

			get: function(userId, wishlistName, successFn, failFn) {
				return $http.get('/api/users/' + userId + '/wishlists/' + wishlistName)
					.then(successFn, failFn);
			},

			create: function(config, wishlistData, successFn, failFn) {

				var userId = config.userId,
					token = config.token;

				return $http({
					method: 'POST',
					url: '/api/users/' + userId + '/wishlists',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': token
					},
					data: wishlistData
				}).then(successFn, failFn);
			}
		}
	}
})(angular);