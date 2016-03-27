'use strict';

(function(angular){
	angular
		.module('wishlist', [
			'ngMaterial', 'ui.router', 'LocalStorageModule'
		])
		.config(['$stateProvider', '$urlRouterProvider', 
		'localStorageServiceProvider',
			initConfig])
		.run(['$rootScope', initRun]);

	function initRun($rootScope) {

	}

	function initConfig($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

		localStorageServiceProvider.setNotify(true, true);

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
			.state('users_all', {
				url: '/users',
				templateUrl: templatePath('users/all'),
				controller: 'UserAllCtrl'
			})
			.state('users_show', {
				url: '/users/:userId',
				templateUrl: templatePath('users/show'),
				controller: 'UserShowCtrl'
			})
			.state('wishlists_all', {
				url: 'users/{userId}/wishlists',
				templateUrl: templatePath('wishlists/all'),
				controller: 'WishlistAllCtrl'
			})
			.state('wishlists_show', {
				url: '/users/{userId}/wishlists/{wishlistId}',
				templateUrl: templatePath('wishlists/show'),
				controller: 'WishlistShowCtrl'
			})
			.state('wishlists_new', {
				url: '/users/{userId}/wishlists/new',
				templateUrl: templatePath('wishlists/new'),
				controller: 'WishlistNewCtrl'
			})
			.state('items_new', {
				url: '/users/{userId}/wishlists/{wishlistId}/items/new',
				templateUrl: templatePath('items/new'),
				controller: 'ItemNewCtrl'
			})
			.state('items_all', {
				url: '/users/{userId}/wishlists/{wishlistId}/items',
				templateUrl: templatePath('items/all'),
				controller: 'ItemAllCtrl'
			})
			.state('items_show', {
				url: '/users/{userId}/wishlists/{wishlistId}/items/{itemId}',
				templateUrl: templatePath('items/show'),
				controller: 'ItemShowCtrl'
			})
			;

		function templatePath(path) {
			return 'partials/' + path + '.html';
		}
	}

})(angular);