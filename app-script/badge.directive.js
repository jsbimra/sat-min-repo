(function(){
	'use strict';

	angular.module('satApplication')
		.directive('badge',['$timeout', badgeDirective]);

		/* @ngInject */
		function badgeDirective($timeout){

			var directive = {
				link: link,
				restrict : 'E',
    			transclude : true,
				scope: {
					badgeDir : '='
				},
				templateUrl : './badge.directive.html'
				//controller: '',
				//controllerAs: ''

			};

			return directive;

				
			function link(scope, element, attrs){

				
			
			}
		}
})();