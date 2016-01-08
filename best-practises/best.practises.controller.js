(function(){
	'use strict';

	angular.module('satApplication')
		.controller('bestPractisesController',["$scope", "$http", "$location", 'dataservice', "$timeout", "$routeParams", "appFactory", bestPractisesController])
		.directive('onFinishRender', function ($timeout) {
		    return {
		        restrict: 'A',
		        link: function (scope, element, attr) {
		            if (scope.$last === true) {
		                $timeout(function () {
		                    scope.$emit('ngRepeatFinished');
		                    //scope.$eval(attr.onFinishRender);
		                });
		            }
		        }
		    }
	    });

		var fetchFlag = false;

		/* @ngInject */
		function bestPractisesController($scope,$http,$location, dataservice, $timeout, $routeParams, appFactory){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'result_organization';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			vm.loadingFlag = true;

			

			activate();

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
				
			});

			function ngRepeatFinished(){

				//Invoke any callback after ng-repeat finished
			}

			function activate(){
				/**
			     * Step 1
			     * Ask the fetchData function for the
			     * category data and wait for the promise
			     */
				/*return fetchData().then(function() {
					*
			         * Step 4
			         * Perform an action on resolve of final promise
			        
				});		*/		

				$timeout(function(){
					//Set the loading flag false
					vm.loadingFlag = false;
				},300);	

				//Scroll to top
				$('html, body').animate({scrollTop: '0px'}, 500);
				

				//Update law badge
				if(localStorage['lawBadgeObtain']){

					$scope.$emit('updateLawBadge', localStorage['lawBadgeObtain']);
				}

				//Update org badge
				if(localStorage['orgBadgeObtain']){
					$scope.$emit('updateOrgBadge', localStorage['orgBadgeObtain']);							
				}

				//Update cult badge
				if(localStorage['cultBadgeObtain']){

					$scope.$emit('updateCultBadge', localStorage['cultBadgeObtain']);
				}

				//Update tech badge
				if(localStorage['techBadgeObtain']){

					$scope.$emit('updateTechBadge', localStorage['techBadgeObtain']);
				}

			}

			function fetchData(){
				/**
		       * Step 2
		       * Ask the data service for the data and wait
		       * for the promise
		       */

				
			
			}

			//Invoke foe Google Analytic code
			appFactory.googleAnalyticsCall('goede-praktijken-wet');
 
            ga_storage._trackPageview('/goede-praktijken-wet');

		}
})();
