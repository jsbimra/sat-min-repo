(function(){
	'use strict';

	angular.module('satApplication')
		.directive('customQuestionnaire',['$timeout', questionnaireMethod]);

		/* @ngInject */
		function questionnaireMethod($timeout){

			var directive = {
				link: link,
				restrict : 'EA',
				terminal : true,
    			transclude : true,
				scope: {
					questionnaire : '=catData',
					lsPreviousPage : '&'
				},
				templateUrl : './questionnaire.directive.html',
				controller: 'mainController',
				controllerAs: 'main'

			};

			return directive;

				
			function link(scope, element, attrs){

				//console.log(scope);

				var catTypeArray = ['law-regulation-set', 'organization-set', 'culture-set', 'technique-set'];

				$timeout(function(){

					scope.$watchCollection('questionnaire', function(val) { 
						
						if(val != null && val != ''){
							//console.log('from directive '+val['cat_type']);
							var getCatType = val['cat_type'];

							scope.$emit('updateFormField', getCatType);	

							//Update heading borders
							underlineHeading(val);
							//console.log(scope.questionnaire.cat_type + ' questionarieForm '  +scope.questionnaire.cat_score);

							//scope.main.nextPageTrigger(scope.questionnaire.cat_type, 'questionarieForm', scope.questionnaire.cat_score);
						}
					});

		
					//Watch answeredQuestion model changed 
					scope.$watch('main.answeredQuestion', function(val){
						//Passing data for answered count
						if(scope.questionnaire){							
							if('cat_type' in scope.questionnaire){
								
								var answerCountData =  {
									catType: scope.questionnaire.cat_type,
									count: val
								}
								
								scope.$emit('recieveQuestionAnsweredCount', answerCountData);
							}
						}
					});

				},150);

				
				function underlineHeading(data){
					if(data){
						if('cat_type' in data){
							if(data.cat_type == catTypeArray[0]){
								$('.heading').addClass('lawHeading');
							}
							if(data.cat_type == catTypeArray[1]){
								$('.heading').addClass('orgHeading');
							}
							if(data.cat_type == catTypeArray[2]){
								$('.heading').addClass('cultHeading');
							}
							if(data.cat_type == catTypeArray[3]){
								$('.heading').addClass('techHeading');
							}
						}
					}
				}		
			
					
			}
		}
})();