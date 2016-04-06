(function(){
	'use strict';

	angular.module('satApplication')
		.controller('navbarController',["$scope", "$http", "$location", navbarController]);

		/* @ngInject */
		function navbarController($scope,$http, $location){

			var vm = this;

			vm.hideNavBar = true;
			vm.setActiveClass = setActiveClass;

			function setActiveClass(path){				

				if($location.path().substr(0,path.length) == path){
					return 'active';
				}
				else{
					return '';
				}
			}

			$scope.$on('$routeChangeStart', function(next, current) { 
			  
				if($location.path() == '/landing'){
					vm.hideNavBar = true;
				}
				else{
					vm.hideNavBar = false;					
				}
			});
				
		}
})();