'use strict';

(function(angular) {

	angular
		.module('wishlist')
		.controller('UserAllCtrl', 
			['UserService', '$log', userAllCtrl]);

	function userAllCtrl(UserService, $log) {
		$log.log("In UserAllCtrl");

		UserService.all(usersLoaded, failedToLoadUsers);

		function usersLoaded(res) {

		}

		function failedToLoadUsers(res) {

		}
	}

})(angular);