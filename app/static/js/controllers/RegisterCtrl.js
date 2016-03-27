'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('RegisterCtrl', 
			['UserService', '$state', '$http', '$log', '$scope', 'localStorageService', 
				registerCtrl]);

	function registerCtrl(UserService, $state, $http, $log, $scope, localStorageService) {
		$scope.user = {};

		$scope.createUser = function(user) {
			UserService.register(user, registerSuccess, registerFail);

			function registerSuccess(response) {
				if (response.status >= 200 && response.status < 300) {
					$log.log(response.data);

					var data = response.data;

					localStorageService.set('token', data.token);
					localStorageService.set('expire_at', data.expire_at);
					localStorageService.set('user_id', data.user_id);

					$state.go('user_show', {'userId': data.user_id});
				}
			}

			function registerFail(response) {
				$log.log(response);
			}

		};
	}

})(angular);