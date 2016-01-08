(function(){
	'use strict';

    /* @ngInject */
	angular.module('satApplication')
		.config(["$routeProvider", "$locationProvider",  function($routeProvider, $locationProvider){
			$routeProvider.
				when('/landing',
				{
					templateUrl: './landing/landingTemplate.html',
					controller: 'landingController',
					controllerAs: 'landingCtrl'
				}).
				when('/toelichting',
				{
					templateUrl: './instruction/instructionTemplate.html',
					controller: 'instructionController',
					controllerAs: 'insCtrl'
				}).
				when('/wet-en-regelgeving',{
					templateUrl: './lawAndRegulations/lawAndRegulationsTemplate.html',
					controller: 'lawAndRegulationsController',
					controllerAs: 'lRCtrl'
				}).
				when('/organisatie', {
					templateUrl: './organization/organizationTemplate.html',
					controller: 'organizationController',
					controllerAs: 'org'
				}).
				when('/cultuur', {
					templateUrl: './culture/cultureTemplate.html',
					controller: 'cultureController',
					controllerAs: 'cult'
				}).				
				when('/techniek', {
					templateUrl: './techniek/techniekTemplate.html',
					controller: 'techniekController',
					controllerAs: 'tech'
				}).			
				when('/resultaten', {
					templateUrl: './result/resultTemplate.html',
					controller: 'resultController',
					controllerAs: 'resultCtrl'
				}).		
				when('/goede-praktijken-wet', {
					templateUrl: './best-practises/best-practise-law-regulations.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-org', {
					templateUrl: './best-practises/best-practise-organization.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-cult', {
					templateUrl: './best-practises/best-practise-culture.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-tech', {
					templateUrl: './best-practises/best-practise-technique.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).
				/*when('/profileDetail/:id',
				{
					templateUrl: './profile/profileDetail.html',
					controller: 'profileController',
					controllerAs: 'pro'
				}).*/
			    otherwise({
			    	redirectTo: '/landing'
			    });

			//$locationProvider.html5Mode.enabled = true;
			//console.log($locationProvider.html5Mode.enabled);	
		}]);
})();