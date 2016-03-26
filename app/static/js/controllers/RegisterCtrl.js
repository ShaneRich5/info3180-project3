'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('RegisterCtrl', 
			['$http', '$log', '$scope', registerCtrl]);

	function registerCtrl($http, $log, $scope) {
		$log.log('register');

		$scope.user = {};

		$scope.createUser = function(user) {
			$http.post('/api/register', user)
				.then(function success(response) {
					if (response.status >= 200 && response.status < 300) {
						$log.log(response.data);
					}
				}, function failure(response) {
					$log.log(response);
				});

			$log.log(user);
		};
	}

})(angular);