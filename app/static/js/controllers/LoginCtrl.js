'use strict';

(function(angular) {
	
	angular
		.module('wishlist')
		.controller('LoginCtrl', 
			['Session', 'UserService', 'localStorageService', '$scope', '$log', loginCtrl]);

	function loginCtrl(Session, UserService, localStorageService, $scope, $log) {
		$scope.credentials = {};

		var auth = Session.getToken();

		if (auth.token != undefined || auth.token != null)
			$state.go('home');

		$scope.attemptLogin = function(credentials) {
			$log.log('in login attempt ' + credentials);
			UserService.login(credentials, loginSuccessful, loginFailure);
		}

		function loginSuccessful(res) {
			$log.log('login successful');
			var data = response.data;
			Session.save(data);
			$state.go('user_show', {'userId': data.user_id});
		}

		function loginFailure(res) {

			$log.log(res);
		}
	}

})(angular);