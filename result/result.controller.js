(function(){
	'use strict';

	angular.module('satApplication')
		.controller('resultController',["$scope", "$http", "$location", 'dataservice', "$timeout", "renderChart", "appFactory", "$routeParams", "constServiceBaseURL", resultController])
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
		function resultController($scope,$http,$location, dataservice, $timeout, renderChart, appFactory, $routeParams, constServiceBaseURL){

			var vm = this, strConfirmYes = 'Ja, ik geef toestemming';

			vm.categoryInfo             = null;
			vm.catData                  = null;
			vm.localStorageKeyName      = 'result_organization';
			vm.questions                = {};
			vm.ngRepeatFinished         	= ngRepeatFinished;
			vm.loadingFlag              = true;
			vm.activateLawTips          = false;
			vm.activateOrgTips          = false;
			vm.activateCultTips         = false;
			vm.activateTechTips         = false;
			vm.showLawHigherDefaultTip  = false;
			vm.showOrgHigherDefaultTip  = false;
			vm.showCultHigherDefaultTip = false;
			vm.showTechHigherDefaultTip = false;
			vm.consolidateArr           = [];
			vm.lawTips                  = [];
			vm.orgTips                  = [];
			vm.cultTips                 = [];
			vm.techTips                 = [];
			vm.termSaveText             = 'Om jouw resultaat te kunnen vergelijken met dat van anderen, vragen wij toestemming om jouw data te gebruiken. Het gaat daarbij alleen om de uitkomsten in percentage per puzzelstuk (wet- en regelgeving, organisatie, cultuur en techniek), sectortype en bedrijfsgrootte. Deze gegevens worden anoniem opgeslagen. De gegevens worden enkel gebruikt voor vergelijking met resultaten van andere gebruikers.';
			vm.tipsDefaultText          = 'Er worden geen tips getoond omdat je nog geen vragen hebt beantwoord. Ga aan de slag met de vragen zodat je tips kunt ontvangen die voor jouw organisatie relevant zijn.';
			vm.tipsDefaultHigherText 	= 'Op basis van de door jou gegeven antwoorden zijn er geen tips beschikbaar. Dit betekent uiteraard niet dat je klaar bent. Gezond en veilig werken is dynamisch en er is altijd ruimte voor verbetering. Kijk eens <a href="http://www.gezondenveiligwerkt.nl/" target="_blank">www.gezondenveiligwerkt.nl</a> en <a href="http://www.arboportaal.nl/" target="_blank">www.arboportaal.nl</a>.';			
			vm.chartSectorLegend 		= 'Gemiddelde score in jouw sector';
			vm.additionalTypeSizeInfo 	= ''			
			vm.sectorCompanyValue 		= getlsSectorCompany().sector_value;
			vm.sizeCompanyValue         = getlsSectorCompany().company_value;
			vm.lessRecordsFlag          = false;
			vm.activeButton             = false;
			vm.whatType                 = '';
			vm.lsGUID                   = appFactory.getLSValue('SAT.guid') != undefined ? appFactory.getLSValue('SAT.guid') : 'NOGUIDFORMED';
			vm.confirmSubmit            = confirmSubmit;
			vm.submitResults            = submitResults;
			vm.confirmYesText 			= strConfirmYes;

			var confirmationModal = $('#confirmationModal'),
				userAlertModal    = $('#userAlertModal');


			//Invoke foe Google Analytic code
			appFactory.googleAnalyticsCall('resultaten');
			
			//SetInvalid Form page
			appFactory.setLSFormPage('invalidFormPage');

			activate();

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
				
			});

			function ngRepeatFinished(){

				//Invoke any callback after ng-repeat finished
			}


			//Watch on whatType object when using controller as syntax in view
			$scope.$watch(angular.bind(this, function (whatType) {
				  return this.whatType;
				}), function (nv, ov) {

				var nv = $.trim(nv);

				if(nv == 'sector_type'){
					vm.additionalTypeSizeInfo = ' <strong>'+ getlsSectorCompany().sector_value + '</strong>';
					//vm.chartSectorLegend = 'Gemiddelde score in jouw sector ' + vm.additionalTypeSizeInfo;

				}

				if(nv == 'company_size'){
					vm.additionalTypeSizeInfo = ' <strong>'+ getlsSectorCompany().company_value + '</strong>';
					//vm.chartSectorLegend = 'Gemiddelde score voor bedrijven met ' + vm.additionalTypeSizeInfo;

				}
				if(nv == 'sector_type,company_size'){
					vm.additionalTypeSizeInfo = ' <strong>'+ getlsSectorCompany().sector_value + '</strong> / <strong>' + getlsSectorCompany().company_value + '</strong>';
					//vm.chartSectorLegend = 'Gemiddelde score voor bedrijven met ' + vm.additionalTypeSizeInfo;
				}

				vm.lessRecordMsg = 'De database wordt momenteel gevuld met gegevens. Hierdoor is de vergelijkingsfunctie op dit moment nog niet beschikbaar voor '+
									vm.additionalTypeSizeInfo +
									'.<br /> Onze excuses voor het ongemak.';

			});


			//Watch on youArr object when using controller as syntax in view
			$scope.$watch(angular.bind(this, function (youArr) {
				  return this.youArr;
				}), function (nv, ov) {

				//console.log(nv + ' ' + ov);
				vm.youArrChanged = true;
			});

			/*
				Set lsAgreementStatus with localStorage value
			*/
			var lsAgreementStatus = localStorage.getItem('SAT.userAgreement');


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
					 $('[data-toggle="tooltip"]').tooltip();
				},200);

				emitBadgesInfo();

				//Fetch localStorage Law data
				if(window.localStorage !== undefined){


					/*Getting localStorage data for tips*/
					if(localStorage.getItem('law-regulation-set')){

						if(getLocalDataTips('law-regulation-set')){
							var tips = getLocalDataTips('law-regulation-set');

							vm.activateLawTips = true;

							if(tips){
								var getTipsData = tipsData(tips);

								if(getTipsData){
									vm.lawTips = getTipsData.reformatTips;
									vm.showLawHigherDefaultTip = getTipsData.higherTipFlag;
								}

							}
							
						}						
					}

					if(localStorage.getItem('organization-set')){

						if(getLocalDataTips('organization-set')){
							
							var tips = getLocalDataTips('organization-set');

							vm.activateOrgTips = true;

							if(tips){
								var getTipsData = tipsData(tips);

								if(getTipsData){
									vm.orgTips = getTipsData.reformatTips;
									vm.showOrgHigherDefaultTip = getTipsData.higherTipFlag;
								}
							}
						}		
					}

					if(localStorage.getItem('culture-set')){

						if(getLocalDataTips('culture-set')){
							
							var tips = getLocalDataTips('culture-set');

							vm.activateCultTips = true;

							if(tips){
								var getTipsData = tipsData(tips);

								if(getTipsData){
									vm.cultTips = getTipsData.reformatTips;
									vm.showCultHigherDefaultTip = getTipsData.higherTipFlag;
								}
							}
						}		
					}

					if(localStorage.getItem('technique-set')){

						if(getLocalDataTips('technique-set')){
							
							var tips = getLocalDataTips('technique-set');

							vm.activateTechTips = true;

							if(tips){
								var getTipsData = tipsData(tips);

								if(getTipsData){
									vm.techTips = getTipsData.reformatTips;
									vm.showTechHigherDefaultTip = getTipsData.higherTipFlag;
								}
							}
						}		
					}
				}

			}

			function emitBadgesInfo(){

				//Update law badge
				if(localStorage.getItem('lawBadgeObtain')){
					$scope.$emit('updateLawBadge', localStorage.getItem('lawBadgeObtain'));
				}

				//Update org badge
				if(localStorage.getItem('orgBadgeObtain')){
					$scope.$emit('updateOrgBadge', localStorage.getItem('orgBadgeObtain'));							
				}

				//Update cult badge
				if(localStorage.getItem('cultBadgeObtain')){
					$scope.$emit('updateCultBadge', localStorage.getItem('cultBadgeObtain'));
				}

				//Update tech badge
				if(localStorage.getItem('techBadgeObtain')){
					$scope.$emit('updateTechBadge', localStorage.getItem('techBadgeObtain'));
				}

				//Update law badge
				var lsLawBadgeDesc = localStorage.getItem('lsLawBadgeDesc');

				if(lsLawBadgeDesc){
					$scope.$emit('updateLawBadgeDesc', lsLawBadgeDesc);
				}

				//Update org badge 
				var lsOrgBadgeDesc = localStorage.getItem('lsOrgBadgeDesc');

				if(lsOrgBadgeDesc){
					$scope.$emit('updateOrgBadgeDesc', lsOrgBadgeDesc);							
				}

				//Update cult badge
				var lsCulBadgeDesc = localStorage.getItem('lsCultBadgeDesc');
				if(lsCulBadgeDesc){
					$scope.$emit('updateCultBadgeDesc', lsCulBadgeDesc);
				}

				//Update tech badge
				var lsTechBadgeDesc = localStorage.getItem('lsTechBadgeDesc');
				if(lsTechBadgeDesc){
					$scope.$emit('updateTechBadgeDesc', lsTechBadgeDesc);
				}
			}

			function tipsData(tips){

				if(tips != undefined && angular.isArray(tips)){

					var textCount = 0, nullCount = 0, reformatTips = [], higherTipFlag = false;

					angular.forEach(tips, function(item, idx){

						if(item == "higherTip"){
							nullCount++;
						}
						else{
							textCount++;
						}
					});							

					if(textCount != 0){
						//console.log('Show all the tips');

						var removeItem = "higherTip";
						
						reformatTips = $.grep(tips, function(value) {
							return value != removeItem;
						});

						 reformatTips;
					}
					if(textCount == 0 && nullCount != 0){
						//console.log('Show default Higher tips');
						higherTipFlag = true;
					}

					return {
						reformatTips : reformatTips,
						higherTipFlag : higherTipFlag
					}
				}
			}

			function getLocalDataTips(cat_name){

				if(cat_name != undefined && cat_name != ''){

					var localTips = JSON.parse(localStorage.getItem(cat_name));
					
					if('tips' in localTips){

						if(angular.isArray(localTips.tips) && localTips.tips != '') {

							var tips = localTips.tips;

						//	console.log(tips);

							return tips;
						}
					}		
				}
				
			}


			//angular.element(document).ready(function () {});
			var chartData = renderChart.serveChartData();	

		   	function getChartOptions(){
		        if(chartData){
		        	if('chartOptions' in chartData){
		        		return chartData.chartOptions;
		        	}
		        }		        
		    }
		    
		    function getChartDataSets(){		        	       
		        if(chartData){
		        	if('chartDataSets' in chartData){
		        		return chartData.chartDataSets;
		        	}	        	
		        }		        
		    }
		    
		    function getChartLabels(){
		        if(chartData){
		        	if('chartLabels' in chartData){
		        		return chartData.chartLabels;
		        	}	        	
		        }		        
		    }

		    function getChartColurs(){
		        if(chartData){
		        	if('chartColour' in chartData){
		        		return chartData.chartColour;
		        	}	        	
		        }		        
		    }

		$scope.chartOptions = getChartOptions() != undefined ? getChartOptions() : '';
		$scope.chartDataSets = getChartDataSets()  != undefined ? getChartDataSets() : '';
		$scope.chartLabels = getChartLabels()  != undefined ? getChartLabels() : '';
		
		  
		var lawPercent = getPercentObtaionData('law-regulation-set') != undefined ? getPercentObtaionData('law-regulation-set') : 0;
		var orgPercent = getPercentObtaionData('organization-set') != undefined ? getPercentObtaionData('organization-set') : 0;
		var cultPercent = getPercentObtaionData('culture-set') != undefined ? getPercentObtaionData('culture-set') : 0;
		var techPercent = getPercentObtaionData('technique-set') != undefined ? getPercentObtaionData('technique-set') : 0;

		vm.youArr = [lawPercent, orgPercent , cultPercent, techPercent];


		if(localStorage.getItem('SAT.activeBenchmarkType') != undefined && localStorage.getItem('SAT.activeBenchmarkType') ){
			vm.activeBenchmarkType = localStorage.getItem('SAT.activeBenchmarkType');
		}


		var lsConsolidateData = appFactory.getLSValue('SAT.consolidateData');
		 
		if(lsConsolidateData != undefined){
			vm.consolidateArr = appFactory.manipulateConsData(lsConsolidateData);
		}

		//Watch on consolidateArr object when using controller as syntax in view
		$scope.$watch(angular.bind(this, function (consolidateArr) {
			  return this.consolidateArr;
			}), function (newVal, oldVal) {

			$scope.$emit('updateChartNewData', newVal);
		});

		
		$scope.$on('updateChartNewData', function(event, data){
			// console.log(data);

			if(data != undefined && data.length != 0){
				 $scope.chartData = [  data, vm.youArr ];
				 $scope.chartColours = getChartColurs()  != undefined ? getChartColurs() : '';
			}else{
				 $scope.chartData = [ vm.youArr ];
				 $scope.chartColours = [{
					fillColor: "rgba(205, 229, 242,0.6)",
					strokeColor: "#2b98a8",
					pointColor: "rgba(205, 229, 242,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(205, 229, 242,1)"
				}];
			}

			//console.log('First chart Data ' + $scope.chartData[0] + ' === ' + 'Second chart data ' + $scope.chartData[1] );
		});

		//console.log(Chart.defaults.global.colours);


		/*$scope.onChartClick = function (points, evt) {
			console.log(points, evt);
		};*/

	    $scope.$on('create', function (event, chart) {
		  //console.log(chart);
		});


		function getPercentObtaionData(lsKey){
			if(window.localStorage !== undefined){

				if(lsKey){
					var getData = localStorage.getItem(lsKey);
					
					if(getData){
						getData = JSON.parse(getData);

						if('percentageObtained' in getData){
							return getData.percentageObtained;
						}
						else{
							return undefined;
						}
					}
				}
				
			}else{
				console.log('localStorage support not available.');
			}
		}

		/*
			Confirm Submit Result
		*/
		
		function confirmSubmit(args){
			
			var args = arguments, dataToServer = null;

			/*
				Show modal only if user not confirmed yet to save the data on server side
			*/
			// console.log('lsAgreementStatus '+lsAgreementStatus);

			if(args.length == 1){
				vm.whatType = $.trim(args[0]);
			}
			if(args.length > 1){
				vm.whatType = $.trim(args[0]+','+args[1]);
			}

			if(lsAgreementStatus == undefined || lsAgreementStatus == 'no' || lsAgreementStatus == '' || lsAgreementStatus == null){

				/* Save data based on you data not equals 0*/
				if(lawPercent == 0 && orgPercent == 0 && cultPercent == 0 && techPercent == 0){
					userAlertModal.modal('show');
				}else{
					confirmationModal.modal({
						//keyboard:false,
						//backdrop: 'static'
					});
				}
			}
			else{

				/*
					If either any one of the arguments as sector or company size
				*/

				if(args && args.length == 1){
					if(args[0] == 'sector_type'){
						dataToServer = {sector_type: getlsSectorCompany().sector_value, company_size: '', guid: vm.lsGUID};						
					}

					if(args[0] == 'company_size'){
						dataToServer = {sector_type: '', company_size: getlsSectorCompany().company_value, guid: vm.lsGUID};
					}

					/*
						Set localStorage to highlight the button user last time clicked on/or current chart plot with what data
					*/
					localStorage.setItem('SAT.activeBenchmarkType', args[0]);
				}

				/*
					If both sectory and company type button invoked
				*/
				if(args && args.length > 1){
					dataToServer = {sector_type: getlsSectorCompany().sector_value, company_size: getlsSectorCompany().company_value, guid: vm.lsGUID};
					
					/*
						Set localStorage to highlight the button user last time clicked on/or current chart plot with what data
					*/
					localStorage.setItem('SAT.activeBenchmarkType', 'both');
				}
				
				/*
					Fetch data from server to ploth the benchmark data
				*/
				if(dataToServer != null && angular.isObject(dataToServer)){
					//Fetch data to plot the graph
					fetchData(dataToServer);
				}

				/*
					On Page load or refreshed insert or update the database and also when user agreement confirmed
				*/
				if(vm.youArrChanged){						
					//Post the if any changed in you data array only
					postToServer(preparedPostData());	
				}
			}
		}

		/* fetch data from server based on query paramertes*/
		function fetchData(queryObj){
			var serviceURL = constServiceBaseURL+'GetRecord';
			//console.log(queryObj);

			if(queryObj != undefined && angular.isObject(queryObj)){
				return dataservice.postData(serviceURL, queryObj)
	       			.then(function(resp){
						if(resp){		
							console.log(resp);	
							if(resp == 'lessRecords'){
								vm.lessRecordsFlag = true;
								userAlertModal.modal('show');
							}

							if(resp != 'lessRecords' && resp != 'fail'){											
								vm.fetchedResult = appFactory.manipulateConsData(resp);
								$scope.$emit('updateChartNewData', vm.fetchedResult);
								localStorage.setItem('SAT.consolidateData', resp);	
							}
							else{
								vm.fetchedResult = [];
								$scope.$emit('updateChartNewData', vm.fetchedResult);
							}
						}
	       			});
	       	}else{
	       		console.log('queryObj is not defined or not an object type');
	       	}
		}

		/*
			Prepare postData
		*/
		function preparedPostData(){

			var dataToServer = {
				guid : vm.lsGUID,
				sector_type : getlsSectorCompany().sector_value,
				company_size : getlsSectorCompany().company_value,
				law_cat : lawPercent,
				org_cat : orgPercent,
				cult_cat : cultPercent,
				tech_cat : techPercent
			};

			return dataToServer;
		}

		/* Posting data to server */
		function postToServer(postObj){
			//vm.loadingFlag = true;

			var serviceUrl = constServiceBaseURL+'AddInsUpRecord';

			if(postObj != undefined && angular.isObject(postObj)){

				vm.confirmYesText = 'Verzending...';

				$http.post(serviceUrl, JSON.stringify(postObj))
					.then(function(resp){
						//console.log(resp);

						//If success set the userAgreement local storage yes.
						localStorage.setItem('SAT.userAgreement', 'confirmed');
						lsAgreementStatus = 'confirmed';
						vm.youArrChanged = false;
						vm.confirmSubmit(vm.whatType);

						//Hide loader and confirmation box later
						logicHandler();

					}, function(respError){
						//console.log(respError.status);
						logicHandler();
					});	
			}else{
				console.log('Post object is not defined or not an object');
			}

			//Execute after post successfull or failed
			function logicHandler() {
				vm.confirmYesText = strConfirmYes;
				
				vm.loadingFlag = false;
				vm.agreeTerm = false;
				//Hide the confirmation confirmationModal
				confirmationModal.modal('hide');
			}
		}

		/*
			Submitting result page data to server
		*/
		
		function submitResults(args){
			//console.log(args);
			postToServer(preparedPostData());			
		}

		function getlsSectorCompany(){
			var lsSectorCompany = appFactory.getLSValue('SAT.lsSectoryCompany'), lsSCArray = [];

			if(lsSectorCompany != undefined && lsSectorCompany.length !=0){
				lsSCArray = lsSectorCompany.split('|');
			}

			var returnObj = {
				sector_value : null,
				company_value: null
			};

			if(lsSCArray.length != 0){
				returnObj = {
					sector_value : lsSCArray[0],
					company_value: lsSCArray[1]
				}
			}
			return returnObj;

		}

		//click on options buttons
		$(document).on('click', '.result-sidebar-list a',function(){
			var me = $(this);
			$('.result-sidebar-list a').removeClass('active');
			me.addClass('active');
		});

		//On confirmation modal closed
		confirmationModal.on('hide.bs.modal',function(){
			customModalObj.onModalHide();
		});	

		//On user alert modal closed
		userAlertModal.on('hidden.bs.modal',function(){
			customModalObj.onModalHide();			
		});	

		var customModalObj = {
			onModalHide: function(){
				if(lsAgreementStatus == undefined || lsAgreementStatus == 'no' || lsAgreementStatus == '' || lsAgreementStatus == null){
					$('.result-sidebar-list a').removeClass('active');
				}
			}
		}
 
        ga_storage._trackPageview('/result');

	}//Controller func end


})();
