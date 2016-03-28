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

					Session.save(data);

					$state.go('user_show', {'userId': data.user_id});
					}
			}

			function registerFail(response) {
				$log.log(response);
			}

		};
	}

})(angular);