(function(){
	'use strict';

	angular.module('satApplication')
		.controller('parentController',["$scope", "$http", "$location", "$timeout", "$routeParams", "dataservice", "appFactory", parentController]);
		
		 /* @ngInject */
		function parentController($scope,$http,$location, $timeout, $routeParams, dataservice, appFactory){

			var vm = this;			

			vm.loadingFlag = false;
			vm.toggleLawCheckIcon = false;
			vm.toggleOrgCheckIcon = false;
			vm.toggleCultCheckIcon = false;
			vm.toggleTechCheckIcon = false;
			vm.globalBadgeObtainedList = [];
			vm.saveForm = saveForm;
			vm.categoryObject = {};
			vm.submitSectorCompany = submitSectorCompany;
			
			//console.log(vm.globalBadgeObtainedList);

			/*$scope.$watch('globalBadgeObtainedList', function (event, data){
				console.log(JSON.stringify(data));
			});*/
			
			/* Creating origin object for IE */
			if (!window.location.origin) {
			  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
			}
			vm.serverRoothPath = window.location.origin+window.location.pathname;
			
			
			/*
				Set GUID on application start for unique data
			*/			
			appFactory.setLSGUID();

			/*
				getTickStatus object from appFactory
			*/
			vm.lsTickStatus = appFactory.getTickStatus();

			if(vm.lsTickStatus != undefined){
				if(vm.lsTickStatus.lStatus == 'active'){
					vm.toggleLawCheckIcon = true;
				}
				if(vm.lsTickStatus.oStatus == 'active'){
					vm.toggleOrgCheckIcon = true;
				}
				if(vm.lsTickStatus.cStatus == 'active'){
					vm.toggleCultCheckIcon = true;
				}
				if(vm.lsTickStatus.tStatus == 'active'){
					vm.toggleTechCheckIcon = true;
				}

				$scope.$broadcast('lsTickStatusBrodacast', vm.lsTickStatus);
			}

			vm.clearStorage = function (){
				
				 localStorage.clear(); 
				 alert('LocalStorage data cleared.'); 
				 var origin = window.location.origin;  
				 var pathname = window.location.pathname;

				 window.location.href = origin+pathname;
				 return false;
			}

			if($location.search().clear){
				vm.clearLSFlag = true;
			}
			else{
				vm.clearLSFlag = false;
			}

			function saveForm(catType,formName,catScore,urlAction){
				//alert(catType +','+ formName +','+catScore +','+urlAction);

				var saveParameterObj = {
					catType : catType,
					formName: formName,
					catScore: catScore,
					urlAction: urlAction
				};

				$scope.$broadcast('saveFormData', saveParameterObj);

			}

			$scope.$on('updateParentBadgeArray', function (event, data){
				vm.globalBadgeObtainedList.push(data);	
				//console.log(JSON.stringify(vm.globalBadgeObtainedList));

				$scope.$broadcast('updatedParentBadgeArray', data);
			});

			//Recieving main category data
			$scope.$on('categoryData', function (event, data){
				//console.log('recived');
				//console.log(data);

				//alert(vm.categoryObject);
				vm.categoryObject = data;

			});	


			//On recieve answered count
			$scope.$on('recieveQuestionAnsweredCount', function($event,data){

				//console.clear();

				//console.log(data);
				//console.log(vm.categoryObject.questions.length);

				if(data != null){

					var totalQuestionCount = vm.categoryObject.questions.length;

					if(data.catType == 'law-regulation-set'){

						if(data.count == totalQuestionCount){
							vm.toggleLawCheckIcon = true;
							localStorage.setItem('SAT.lawTickStatus', 'active');

						}
						else{
							vm.toggleLawCheckIcon = false;
							localStorage.setItem('SAT.lawTickStatus', 'inActive');
						}
							
					}

					if(data.catType == 'organization-set'){

						if(data.count == totalQuestionCount){
							vm.toggleOrgCheckIcon = true;
							localStorage.setItem('SAT.orgTickStatus', 'active');
						}
						else{
							vm.toggleOrgCheckIcon = false;
							localStorage.setItem('SAT.orgTickStatus', 'inActive');
						}
					}

					if(data.catType == 'culture-set'){

						if(data.count == totalQuestionCount){
							vm.toggleCultCheckIcon = true;
							localStorage.setItem('SAT.cultTickStatus', 'active');
						}
						else{
							vm.toggleCultCheckIcon = false;
							localStorage.setItem('SAT.cultTickStatus', 'inActive');
						}
					}

					if(data.catType == 'technique-set'){
						if(data.count == totalQuestionCount){
							vm.toggleTechCheckIcon = true;
							localStorage.setItem('SAT.techTickStatus', 'active');
						}
						else{
							vm.toggleTechCheckIcon = false;
							localStorage.setItem('SAT.techTickStatus', 'inActive');
						}
					}				

				}
				
			});
			

			/*
				Slides code for landing page
			*/
			$(document).on('change', '.jsLandingDD', function(){
				var me = $(this), emptyCount = 0;
				$('.jsLandingDD').each(function() {
				    var cur = $(this);

				    if (cur.val() == '') {
				        emptyCount++;
				    }
				});



				if (me.val() != '' && emptyCount == 0) {

				    me.parents('.landing-form-slide').removeClass('show-slide').addClass('hide-slide');

				    //Show loader 
					vm.loadingFlag = true;


					//Set timeout to off the loader and show the other content
					$timeout(function(){
						$('.landing-content-slide').removeClass('hide-slide').addClass('show-slide');
						vm.loadingFlag = false;
					},300);

				    
				    //Save selction to localStorage on chanage itself
				    vm.submitSectorCompany()
				} else {

				    me.parent('.landing-form-slide').removeClass('hide-slide').addClass('show-slide');
				    $('.landing-content-slide').removeClass('show-slide').addClass('hide-slide');
				}

				/*	Let Angular digest cycle now of model and ui changes 
					http://stackoverflow.com/questions/16066170/angularjs-directives-change-scope-not-reflected-in-ui*/
				$scope.$apply()
			});

			/* Slide back functionality */
			$(document).on('click', '.jsSlideBack', function() {
			    $('.landing-form-slide').removeClass('hide-slide').addClass('show-slide');
			    $('.landing-content-slide').removeClass('show-slide').addClass('hide-slide');
			});

			/*
				Saving sectorType and Company to localstorage
			*/
			
			function submitSectorCompany(){
				//console.log(vm.sectorType); console.log(vm.companySize);

				if(!appFactory.ifLocalStorageTrue){return;}

				//set localStorage 
				localStorage.setItem('SAT.lsSectoryCompany', vm.sectorType+'|'+vm.companySize);

				/*
					Empty local storage consolidate array data as user select different sector type and company size; 
					otherwise same chart will plot again with previous data
				*/
				localStorage.setItem('SAT.consolidateData','');

				/* request service for fetch data by sector type and company size */
				/**
			     * Step 1
			     * Ask the fetchData function for the
			     * category data and wait for the promise
			     */
				/*fetchData().then(function(){
					console.log('Fetch data');
				});*/

			}

			function fetchData(){
				//var serviceURL = 'https://inccgraphics.in.capgemini.com/SelfAssesmentAPI/api/SelfAnalysis/GetRecord';

			    var serviceURL = 'http://deanderekijkopjouwzaak.gezondenveiligwerkt.nl/api/SelfAnalysis/GetRecord';

				return dataservice.postData(serviceURL,{sector_type: vm.sectorType , company_size: vm.companySize})
	       			.then(function(resp){
						if(resp){							
							//set localStorage 
							localStorage.setItem('SAT.consolidateData', resp);
						}
	       			});
			}
			
		}//controller function end


})();