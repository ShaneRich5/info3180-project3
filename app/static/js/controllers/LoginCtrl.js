'use strict';

(function(angular) {
	
	angular
		.module('wishlist')
		.controller('LoginCtrl', 
			['UserService', 'localStorageService', '$scope', '$log', loginCtrl]);

	function loginCtrl(UserService, localStorageService, $scope, $log) {
		$scope.credentials = {};

		$scope.authenticate = function(credentials) {
			UserService.login(credentials, loginSuccessful, loginFailure);

			function loginSuccessful(res) {
				var data = response.data;

				localStorageService.set('token', data.token);
				localStorageService.set('expire_at', data.expire_at);
				localStorageService.set('user_id', data.user_id);

				$state.go('user_show', {'userId': data.user_id});
			}

			function loginFailure(res) {
				$log.log(res);
			}
		}
	}

})(angular);