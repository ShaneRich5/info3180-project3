'use strict';

(function(angular){
	
	function initConfig($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				template: '<h1>Home</h1>'
			})
			.state('login', {
				url: '/login',
				template: '<h1>Login</h1>'	
			})
			.state('register', {
				url: '/register',
				template: '<h1>Register</h1>'
			});

		$urlRouterProvider.otherwise('');
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