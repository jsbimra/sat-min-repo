(function(){
	'use strict';

	angular.module('satApplication')
		.controller('organizationController',["$scope", "$http", "$location", 'dataservice', "$timeout", "appFactory", "$routeParams", "orgJSONPath", organizationController])
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
		function organizationController($scope,$http,$location, dataservice, $timeout, appFactory, $routeParams, orgJSONPath){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'cat_organization';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			vm.loadingFlag = true;


			//Set Valid Form page
			appFactory.setLSFormPage('validFormPage');


			//Setting cat_type to main controller model -- firing an event upwards
			$scope.$emit('updatePreviousValue', 'law-regulation-set');

			/*
				Request the service for question data
			*/
			//var serviceURL = 'data/Wet-en-regelgeving.JSON';
			/*if(!fetchFlag){
				fetchFlag = true;
				activate();
			} Not working between tab navigation
			*/

			activate();

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
				$timeout(function(){
					//Set the loading flag false
					vm.loadingFlag = false;
				},300);
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
				return fetchData().then(function() {
					/**
			         * Step 4
			         * Perform an action on resolve of final promise
			        */
			        var catData = vm.catData;
					
					if(catData != null && catData != undefined){

						$scope.$emit('categoryData', catData);
					}
				});				
			}

			function fetchData(){
				/**
		       * Step 2
		       * Ask the data service for the data and wait
		       * for the promise
		       */

		       return dataservice.getCategory(orgJSONPath)
		       			.then(function(data){
		       				/**
			               * Step 3
			               * set the data and resolve the promise
			               */
		            	vm.categoryInfo = data;
						vm.catData = vm.categoryInfo.category;

						vm.vQuestions = vm.catData.questions;

						//console.log(vm.catData.cat_type);						

						angular.forEach(vm.vQuestions, function(question, key){
							
							//console.log(question);

							angular.forEach(question, function(val, key){
								//console.log(key + ' <<>> ' +val);
								
							});
						});
						
	       			});	
			
			}

			
			//Invoke foe Google Analytic code

			appFactory.googleAnalyticsCall('organisatie');
 
            ga_storage._trackPageview('/organisatie');

		}
})();
