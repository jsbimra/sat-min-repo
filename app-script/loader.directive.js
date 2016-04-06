(function(){
	'use strict';

	angular.module('satApplication')
		.directive('customLoader',['$timeout', loaderMethod]);

		/* @ngInject */
		function loaderMethod($timeout){

			var directive = {
				link: link,
				restrict : 'E',
    			transclude : true,
				scope: {
					loaderFlag : '='
				},
				templateUrl : './loader.directive.html'
				//controller: '',
				//controllerAs: ''

			};

			return directive;

				
			function link(scope, element, attrs){

				//console.log(scope);

				$timeout(function(){

					scope.$watchCollection('loaderFlag', function(val) { 



					});
				},100);
				// /scope.main.previousPageTrigger();

			
			}
		}
})();