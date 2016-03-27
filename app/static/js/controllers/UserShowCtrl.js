'use strict';
		
(function(angular) {

	angular
		.module('wishlist')
		.controller('UserShowCtrl',
			['UserService', '$log', '$stateParams', '$scope', 'localStorageService', userShowCtrl]);
		
	function userShowCtrl(UserService, $log, $stateParams, $scope, localStorageService, $http) {
		$log.log('In UserShowCtrl ' + $stateParams.userId);
		$scope.no = $stateParams.userId;
		$scope.$on('LocalStorageModule.notification.setitem', function() {
			$scope.test = localStorageService.get('test');
		});

		$scope.save = function() {
			$log.log('clicked');
			localStorageService.set('test', $scope.no);
		}

		UserService.get();
	}

})(angular);