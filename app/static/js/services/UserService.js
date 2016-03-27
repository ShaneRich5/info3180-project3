'use strict';

(function(angular) {
	angular
		.module('wishlist')
		.service('UserService', ['$http', '$log', userService]);

	function userService($http, $log) {

		return {
			login: function(credentials, successFn, failFn) {
				return $http.post('/api/login', credentials)
					.then(successFn, failFn);
			},

			register: function(user, successFn, failFn) {
				return $http.post('/api/register', user)
					.then(successFn, failFn);
			},

			all: function(successFn, failFn) {
				return $http.get('/api/users')
					.then(successFn, failFn);
			},

			get: function(id, successFn, failFn) {
				return $http.get('/api/users/' + id)
					.then(successFn, failFn);
			},

			delete: function(id, successFn, failFn) {
				return $http.delete('/api/users' + id)
					.then(successFn, failFn);
			}
		}
	}

})(angular);