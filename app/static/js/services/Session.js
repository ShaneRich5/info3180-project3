'use strict';

(function(angular){
	angular
		.module('wishlist')
		.service('Session', ['$log', 'localStorageService', sessionService]);

	function sessionService($log, localStorageService) {

		return {
			save: function(data) {
				localStorageService.set('token', data.token);
				localStorageService.set('expire_at', data.expire_at);
				localStorageService.set('user_id', data.user_id);
				localStorageService.set('first_name', data.first_name);
				localStorageService.set('last_name', data.last_name);
				localStorageService.get('email', data.email);
			},

			clear: function() {
				localStorageService.clearAll()
			},

			getToken: function() {
				return {
					token: localStorageService.get('token'),
					expireAt: localStorageService.get('expired_at')
				}
			},

			getUser: function() {
				return {
					userId: localStorageService.get('user_id'),
					firstName: localStorageService.get('first_name'),
					lastName: localStorageService.get('last_name'),
					email: localStorageService.get('email')
				}
			},

			isLoggedIn: function() {
				var token = localStorageService.get('token');

				if (null == token) {
					localstorage.clearAll();
					return false;
				}
				return true;
			}
		}
	}

})(angular);