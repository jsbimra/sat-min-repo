(function(){
	'use strict';

	angular.module('satApplication')
		.controller('instructionController',["$scope", "$http", "$location", "$timeout", "appFactory", instructionController])
		.directive('postRender', ["$timeout", function ($timeout) {
		    return {
		        restrict : 'A', 
    			terminal : true,
		        link: function (scope, element, attrs) {
		    
		            if (attrs) { scope.$eval(attrs.afterRender) }
                   scope.$emit('renderFinished');
                   // scope.$eval(attr.onFinishRender);
                
		            
		        }
		    }
	    }]);

		/* @ngInject */
		function instructionController($scope,$http,$location, $timeout, appFactory){

			var vm = this;
			vm.loadingFlag = true;

			
			//SetInvalid Form page
			appFactory.setLSFormPage('invalidFormPage');

			$scope.$on('renderFinished', function(){
				$timeout(function(){
					//Set the loading flag false
					vm.loadingFlag = false;
				},300);
			});
			
			//Invoke foe Google Analytic code

			appFactory.googleAnalyticsCall('toelichting');
 
            ga_storage._trackPageview('/toelichting');
 
		}
})();
