'use strict';

(function(angular){
	
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
			});

		function templatePath(path) {
			return 'partials/' + path + '.html';
		}
	}

	angular
		.module('wishlist', [
			'ngMaterial', 'ui.router'
		])
		.config(['$stateProvider', '$urlRouterProvider',initConfig])
		.run(function() {

		});
	// 	.config(initConfig)
	// 	.run([]);

	

})(angular);