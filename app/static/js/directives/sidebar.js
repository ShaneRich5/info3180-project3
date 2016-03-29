'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.directive('sidebar', 
			['$state', '$log', sidebarFn]);

	function sidebarFn($state, $log) {

		return {
			scope: {},
			restrict: 'AE',
			replace: 'true',
			templateUrl: 'partials/navigation/sidebar.html',
			controller: function() {

			},
			link: function(scope, elem, attr) {
				scope.wishlists = [
					{
						name: 'First'
					},
					{
						name: 'Second'
					}
				];
			}
		}
	}

})(angular);