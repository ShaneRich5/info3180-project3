'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.directive('sidebar', 
			['$log', 'Session', 'WishlistService', '$state', sidebarFn]);

	function sidebarFn($log, Session, WishlistService, $state) {
		return {
			scope: {},
			restrict: 'AE',
			replace: 'true',
			templateUrl: 'partials/navigation/sidebar.html',
			controller: function() {

			},
			link: function(scope, elem, attr) {
				var user = Session.getUser(),
					auth = Session.getToken();

				// WishlistService.all(user.userId,
				// 	wishlistLoadSuccess, wishlistLoadFail);

				scope.wishlists = {};

				function wishlistLoadSuccess(response) {
					scope.wishlists = response.wishlists;
				}

				function wishlistLoadFail(response) {

				}
			}
		}
	}

})(angular);