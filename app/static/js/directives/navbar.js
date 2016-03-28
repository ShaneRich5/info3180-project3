'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.directive('navbar', 
			['$state', 'localStorageService', 'Session', '$log', navbarFn]);

	function navbarFn($state, localStorageService, Session, $log) {
		return {
			scope: {},
			restrict: 'AE',
			replace: 'true',
			templateUrl: 'partials/navigation/navbar.html',
			link: function (scope, elem, attr) {
				updateUser();

				scope.openMenu = function($mdOpenMenu, e) {
					$mdOpenMenu(e);
				};

				scope.$on('LocalStorageModule.notification.setitem', function() {
					updateUser();
				});

				scope.$on('LocalStorageModule.notification.removeitem', function() {
					updateUser();
				});

				function updateUser() {
					var token = Session.getToken().token;
					
					if (null == token) {
						scope.user = null;
						Session.clear();
						return;
					}
					scope.user = Session.getUser();
					$log.log(scope.user);
				}

			}
		}
	}

})(angular);