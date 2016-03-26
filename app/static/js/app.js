'use strict';

(function(angular){
	angular
		.module('wishlist', [
			'ngMaterial', 'ui.router'
		])
		.config(['$stateProvider', '$urlRouterProvider', initConfig])
		.run([]);


	function initConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: templatePath('pages/home'),
				controller: 'HomeCtrl'
			})
			.state('login', {
				url: '/login',
				templateUrl: templatePath('sessions/login'),
				controller: 'LoginCtrl'
			})
			.state('register', {
				url: '/register',
				templateUrl: templatePath('sessions/register'),
				controller: 'RegisterCtrl'
			})
			.state('users.all', {
				url: '/users',
				templateUrl: templatePath('users/all'),
				controller: 'UserAllCtrl'
			})
			.state('users.show', {
				url: '/users/:userId',
				templateUrl: templatePath('users/show'),
				controller: 'UserShowCtrl'
			})
			.state('wishlists.all', {
				url: 'users/{userId}/wishlists',
				templateUrl: templatePath('wishlist/all'),
				controller: 'WishlistAllCtrl'
			})
			.state('wishlist.show', {
				url: '/users/{userId}/wishlists/{wishlistId}',
				templateUrl: templatePath('wishlist/show'),
				controller: 'WishlistShowCtrl'
			});

		function templatePath(path) {
			return 'partials/' + path + '.html';
		}
	}

})(angular);