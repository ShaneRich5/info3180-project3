'use strict';

(function(angular) {

	function registerCtrl($log, $scope) {
		$log.log('register');

		$scope.user = {};

		$scope.createUser = function(user) {
			$log.log(user);
		};
	}

	angular
		.module('wishlist')
		.controller('RegisterCtrl', ['$log', '$scope', registerCtrl]);

})(angular);