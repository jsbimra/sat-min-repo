(function(){
	'use strict';

	angular.module('satApplication')
		.controller('lawAndRegulationsController',["$scope", "$http", "$location", 'dataservice', "$timeout", "appFactory", "lawJSONPath", lawAndRegulationsController])
		.directive('onFinishRender', function ($timeout) {
		    return {
		        restrict: 'A',
		        link: function (scope, element, attr) {
		            if (scope.$last === true) {
		                $timeout(function () {
		                   scope.$emit('ngRepeatFinished');
		                   // scope.$eval(attr.onFinishRender);
		                });
		            }
		        }
		    }
	    });
		//lawAndRegulationsController.$inject = ['dataservice'];

		var fetchFlag = false;

		/* @ngInject */
		function lawAndRegulationsController($scope,$http,$location, dataservice, $timeout, appFactory,lawJSONPath){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'cat_law_regulation';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			vm.loadingFlag = true;

			/*
				Request the service for question data
			*/
			//var serviceURL = 'data/Wet-en-regelgeving.JSON';
			/*if(!fetchFlag){
				fetchFlag = true;
				activate();
			} Not working between tab navigation
			*/

			//Set Valid Form page
			appFactory.setLSFormPage('validFormPage');


			activate();

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
				$timeout(function(){
					//Set the loading flag false
					vm.loadingFlag = false;
				},250);
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

		       return dataservice.getCategory(lawJSONPath)
		       			.then(function(data){
		       				/**
			               * Step 3
			               * set the data and resolve the promise
			               */
			            console.log(data);
			            
			            if(data !== undefined && data !== null){
			            	vm.categoryInfo = data;
							vm.catData = vm.categoryInfo.category;

							vm.vQuestions = vm.catData.questions;

							//console.log(vm.catData.cat_type);
							
							//Setting cat_type to main controller model -- firing an event upwards
							$scope.$emit('updatePreviousValue', vm.catData.cat_type);
							

							angular.forEach(vm.vQuestions, function(question, key){
								
								//console.log(question);

								angular.forEach(question, function(val, key){
									//console.log(key + ' <<>> ' +val);
									
								});
							});	
			            }
						
	       			});	
			
			}

			//Invoke foe Google Analytic code

			appFactory.googleAnalyticsCall('wet-en-regelgeving');
 
            ga_storage._trackPageview('/wet-en-regelgeving');

		}
})();
