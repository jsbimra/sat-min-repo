(function(){

	'use strict';

	angular.module('satApplication',['ngRoute', 'chart.js', 'ngSanitize']);

})();
 ;
/* defining global constants */
(function() {
    'use strict';

    angular
        .module('satApplication')
        //.constant('constServiceBaseURL', 'https://inccgraphics.in.capgemini.com/SelfAssesmentAPI/api/SelfAnalysis/')
        .constant('constServiceBaseURL', 'http://deanderekijkopjouwzaak.gezondenveiligwerkt.nl/api/SelfAnalysis/')
        .constant('lawJSONPath', 	'./data/wet-en-regelgeving.js')
        .constant('orgJSONPath', 	'./data/organisatie.js')
        .constant('cultJSONPath', 	'./data/cultuur.js')
        .constant('techJSONPath', 	'./data/techniek.js')

    ; //required to terminate the code

})();
 ;(function(){
	'use strict';

    /* @ngInject */
	angular.module('satApplication')
		.config(["$routeProvider", "$locationProvider",  function($routeProvider, $locationProvider){
			$routeProvider.
				when('/landing',
				{
					templateUrl: './landing/landingTemplate.html',
					controller: 'landingController',
					controllerAs: 'landingCtrl'
				}).
				when('/toelichting',
				{
					templateUrl: './instruction/instructionTemplate.html',
					controller: 'instructionController',
					controllerAs: 'insCtrl'
				}).
				when('/wet-en-regelgeving',{
					templateUrl: './lawAndRegulations/lawAndRegulationsTemplate.html',
					controller: 'lawAndRegulationsController',
					controllerAs: 'lRCtrl'
				}).
				when('/organisatie', {
					templateUrl: './organization/organizationTemplate.html',
					controller: 'organizationController',
					controllerAs: 'org'
				}).
				when('/cultuur', {
					templateUrl: './culture/cultureTemplate.html',
					controller: 'cultureController',
					controllerAs: 'cult'
				}).				
				when('/techniek', {
					templateUrl: './techniek/techniekTemplate.html',
					controller: 'techniekController',
					controllerAs: 'tech'
				}).			
				when('/resultaten', {
					templateUrl: './result/resultTemplate.html',
					controller: 'resultController',
					controllerAs: 'resultCtrl'
				}).		
				when('/goede-praktijken-wet', {
					templateUrl: './best-practises/best-practise-law-regulations.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-org', {
					templateUrl: './best-practises/best-practise-organization.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-cult', {
					templateUrl: './best-practises/best-practise-culture.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).	
				when('/goede-praktijken-tech', {
					templateUrl: './best-practises/best-practise-technique.html',
					controller: 'bestPractisesController',
					controllerAs: 'bestPracCtrl'
				}).
				/*when('/profileDetail/:id',
				{
					templateUrl: './profile/profileDetail.html',
					controller: 'profileController',
					controllerAs: 'pro'
				}).*/
			    otherwise({
			    	redirectTo: '/landing'
			    });

			//$locationProvider.html5Mode.enabled = true;
			//console.log($locationProvider.html5Mode.enabled);	
		}]);
})();
 ;(function(){
    'use strict';

    angular.module('satApplication')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

     /* @ngInject */
    function dataservice($http) {
        return {
            getCategory: getCategory,
            postData: postData,
        };

        function getCategory(serviceURL,data) {

            if(data != undefined && angular.isObject(data)){
                return $http.get(serviceURL, data)
                    .then(getCategoryComplete)
                    .catch(getCategoryFailed);   
            }else{
                return $http.get(serviceURL)
                    .then(getCategoryComplete)
                    .catch(getCategoryFailed);
                }

            function getCategoryComplete(response) {
                console.log(response);
                return response.data;

            }

            function getCategoryFailed(error) {
                console.log(error);

                console.log('XHR Failed for fetch page data.' + error.data);
            }
        }



        function postData(serviceURL,data) {

            if(data != undefined && angular.isObject(data)){
                return $http.post(serviceURL, data)
                    .then(getCategoryComplete)
                    .catch(getCategoryFailed);   
            }

            function getCategoryComplete(response) {
                return response.data;

            }

            function getCategoryFailed(error) {
                console.log('XHR Failed for fetch page data.' + error.data);
            }
        }
    }


})();
 ;/*jshint sub:true*/
/*jshint -W030 */

(function() {
    'use strict';

    angular
        .module('satApplication')
        .factory('appFactory', appFactory);

    appFactory.$inject = ['$http', '$timeout'];

    /* @ngInject */
    function appFactory($http, $timeout) {
        var service = {
            manipulateConsData: manipulateConsData,
            setLSFormPage: setLSFormPage,
            getLSFormPage: getLSFormPage,
            getGuid: getGuid,
            setLSGUID: setLSGUID,
            getLSValue : getLSValue,
            getTickStatus: getTickStatus,
            googleAnalyticsCall: googleAnalyticsCall,
            ifLocalStorageTrue: ifLocalStorageTrue
        };
        return service;

        function  googleAnalyticsCall(pageName){
            
            $('#gaElementId').remove();

            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.id='gaElementId';a.src=g;m.parentNode.insertBefore(a,m);
            })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-69826775-1', 'auto');
 
            //alert(pageName);
            //alert(ga);
 
            console.log(pageName);

            ga('send', 'pageview', {page: pageName !== undefined ? pageName : 'no-url-set'});
            ga('send', 'screenview', {screenName: pageName !== undefined ? pageName : 'no-url-set'});

            //console.log('Google analytics method invoked');
        }

        function manipulateConsData(lsData){
            if(lsData){             
                var parsedData = JSON.parse(lsData), parsedObj = parsedData[0], consolidateArr = [];

                angular.forEach(parsedObj, function(val,key){
                    if(val !== null){
                        consolidateArr.push(val);
                    }else{
                        val = 0;
                    }
                    //(val !== null ? consolidateArr.push(val) : 0); converted to above code
                });

                //console.log('consolidateArr'); console.log(consolidateArr);

                return consolidateArr;
            }                   
        }

        function setLSFormPage(param) {
            if (param) {
                if (!ifLocalStorageTrue) {
                    return;
                }

                localStorage.setItem('SAT.lsFormPage', param);
            }
        }

        function getLSFormPage() {
            if (!ifLocalStorageTrue){return;}

            return localStorage.getItem('SAT.lsFormPage');
        }

        function ifLocalStorageTrue() {

            if ("localStorage" in window && window['localStorage'] !== null) {
                return true;
            } else {
                alert('Sorry, There is no support for localStorage available on browser.');
                return false;
            }
        }

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        function getGuid() {
            var d = new Date(),
                tStamp = d.getTime();
            return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4() +"-" + tStamp).toLowerCase();
        }

        function setLSGUID(){
            if (!ifLocalStorageTrue){return;}
            
            var ls = window.localStorage;

            if(!ls.getItem('SAT.guid')){
                console.log('no guid in localStorage');
                ls.setItem('SAT.guid',getGuid());

            }else{

                if(ls.getItem('SAT.guid').length === 0){
                    ls.setItem('SAT.guid',getGuid());                    
                }
                else{
                    //console.log('Guid has already been set');
                    //console.log(ls.getItem('SAT.guid'));
                }
            }
        }

        function getLSValue(key){
            if (!ifLocalStorageTrue){return;}            
            var ls = window.localStorage;

            if(key !== undefined){
                if(ls.getItem(key)){
                   return ls.getItem(key);                
                }   
            }
        }

        function getTickStatus(){
            if(!ifLocalStorageTrue()){return;}

            var lStatus = localStorage.getItem('SAT.lawTickStatus'),
                oStatus = localStorage.getItem('SAT.orgTickStatus'),
                cStatus = localStorage.getItem('SAT.cultTickStatus'),
                tStatus = localStorage.getItem('SAT.techTickStatus');

            var tickStatusObj = {
                lStatus : lStatus === null ? 'inActive' : lStatus,
                oStatus : oStatus === null ? 'inActive' : oStatus,
                cStatus : cStatus === null ? 'inActive' : cStatus,
                tStatus : tStatus === null ? 'inActive' : tStatus
            };

            return tickStatusObj;

        }
    }
})();

 ;(function() {
    'use strict';

    angular
        .module('satApplication')
        .factory('renderChart', renderChart);

    renderChart.$inject = ['$timeout'];

    /* @ngInject */
    function renderChart($timeout) {
        var service = {
            serveChartData: serveChartData
        };
        return service;


        function serveChartData() {

			var chartLabels = ['WET EN REGELGEVING', 'ORGANISATIE', 'CULTUUR', 'TECHNIEK'];

			var chartColour = [
				{
					fillColor: "rgba(35,152,169,0.5)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(92,152,169,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)"

				},
				{
					fillColor: "rgba(205, 229, 242,0.6)",
					strokeColor: "#2b98a8",
					pointColor: "rgba(205, 229, 242,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(205, 229, 242,1)"
				}
			];
			

			var chartOptions =  {
				animation: true,
				legendTemplate : '<ul class="tc-chart-js-legend radar-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
				// Number - Number of animation steps
				animationSteps: 10,

				// String - Animation easing effect
				// Possible effects are:
				// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
				//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
				//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
				//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
				//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
				//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
				//  easeOutElastic, easeInCubic]
				animationEasing: "easeOutQuart",
				
				//String - Point label font declaration
				pointLabelFontFamily : "'Arial'",

				//String - Point label font weight
				pointLabelFontStyle : "normal",

				//Number - Point label font size in pixels
				pointLabelFontSize : 12,

				//String - Point label font colour
				pointLabelFontColor : "#000",

				// Boolean - If we should show the scale at all
				showScale: true,

				// Boolean - If we want to override with a hard coded scale
				scaleOverride: true,

				// ** Required if scaleOverride is true **
				// Number - The number of steps in a hard coded scale
				scaleSteps: 10,
				// Number - The value jump in the hard coded scale
				scaleStepWidth: 10,
				// Number - The scale starting value
				scaleStartValue: 0,

				// String - Colour of the scale line
				scaleLineColor: "rgba(0,0,0,.1)",

				// Number - Pixel width of the scale line
				scaleLineWidth: 1,

				// Boolean - Whether to show labels on the scale
				scaleShowLabels: false,

				// Interpolated JS string - can access value
				scaleLabel: "<%=value%>",

				// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
				scaleIntegersOnly: true,

				// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				scaleBeginAtZero: true,

				// String - Scale label font declaration for the scale label
				scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Scale label font size in pixels
				scaleFontSize: 14,

				// String - Scale label font weight style
				scaleFontStyle: "normal",

				// String - Scale label font colour
				scaleFontColor: "#000",

				// Boolean - whether or not the chart should be responsive and resize when the browser does.
				responsive: true,

				// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
				maintainAspectRatio: true,

				// Boolean - Determines whether to draw tooltips on the canvas or not
				showTooltips: true,

				// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
				customTooltips: false,

				// Array - Array of string names to attach tooltip events
				tooltipEvents: ["mousemove", "touchstart", "touchmove"],

				// String - Tooltip background colour
				tooltipFillColor: "rgba(0,0,0,0.8)",

				// String - Tooltip label font declaration for the scale label
				tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip label font size in pixels
				tooltipFontSize: 14,

				// String - Tooltip font weight style
				tooltipFontStyle: "normal",

				// String - Tooltip label font colour
				tooltipFontColor: "#fff",

				// String - Tooltip title font declaration for the scale label
				tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip title font size in pixels
				tooltipTitleFontSize: 14,

				// String - Tooltip title font weight style
				tooltipTitleFontStyle: "bold",

				// String - Tooltip title font colour
				tooltipTitleFontColor: "#fff",

				// Number - pixel width of padding around tooltip text
				tooltipYPadding: 6,

				// Number - pixel width of padding around tooltip text
				tooltipXPadding: 6,

				// Number - Size of the caret on the tooltip
				tooltipCaretSize: 8,

				// Number - Pixel radius of the tooltip border
				tooltipCornerRadius: 6,

				// Number - Pixel offset from point x to tooltip edge
				tooltipXOffset: 10,

				// String - Template string for single tooltips
				tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %><%= '%' %>",

				// String - Template string for multiple tooltips
				multiTooltipTemplate: "<%= value %>",

				// Function - Will fire on animation progression.
				onAnimationProgress: function(){},

				// Function - Will fire on animation completion.
				onAnimationComplete: function(){}
			};

			function ifLocalStorageTrue(){

				if("localStorage" in window && window['localStorage'] !== null){
					return true;
				}else{
					alert('Sorry, There is no support for localStorage available on browser.');
					return false;
				}
			}

			var returnObj = {
				chartLabels : chartLabels,
				chartColour : chartColour,
				chartOptions : chartOptions
			}
			return returnObj;
		}
    }
})();
 ;(function(){
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
 ;(function(){
	'use strict';

	angular.module('satApplication')
		.controller('mainController',["$scope", "$http", "$location", "$timeout", "appFactory", "$routeParams", "$rootScope", "$route", mainController]);

	 /* @ngInject */
	function mainController($scope,$http, $location, $timeout, appFactory, $routeParams, $rootScope, $route){

		var vm = this;

		var zeroBadgeDesc = "Je hebt nog geen trofee verdiend.";

		vm.nextPageTrigger = nextPageTrigger;		
		vm.answeredQuestion = 0;
		vm.catTotalScore = 0;		
		vm.previousPageTrigger = previousPageTrigger;
		vm.questionAnswered = questionAnswered;	
		vm.updateNavbarIconState = updateNavbarIconState;
		vm.badgeName = [];
		vm.lawbadgeGrade 	= 'lawBadge0';
		vm.orgbadgeGrade 	= 'orgBadge0';
		vm.cultbadgeGrade	= 'cultBadge0';
		vm.techbadgeGrade 	= 'techBadge0';
		vm.lawBadgeDescModel = zeroBadgeDesc;
		vm.orgBadgeDescModel = zeroBadgeDesc;
		vm.cultBadgeDescModel = zeroBadgeDesc;
		vm.techBadgeDescModel = zeroBadgeDesc;
		vm.badgeChanged = false;

		var lsFormPageFlag;

		var badgeObtainedList = [];
		//vm.loadingFlag = true;		
		

		$scope.$on('updatePreviousValue', function (event, data){
			vm.parentPreviousPage = data;
			
			//Set to local-storage
			if(!ifLocalStorageTrue) {return;}
			localStorage.setItem('previousPage', vm.parentPreviousPage);	
		});


		//Setting previous page value to model from localStorage
		vm.lsPreviousPage = ifLocalStorageTrue() == true ? localStorage.getItem('previousPage') : '';

		/*$scope.$on('updateLoadingFlag', function(event, data){
			console.log('loadding flag triggered');
			vm.loadingFlag = data;
		});*/
	
		$scope.$on('updateLSPrevVal', function (event, data){
			vm.lsPreviousPage = data;
		});


		//Update Badge name
		$scope.$on('updateBadgeName', function (event, data){
			vm.badgeName = data;
		});
		
		//console.log($scope.$parent.parentCtrl.toggleLawCheckIcon);

		//Updating badges model
		$scope.$on('updateLawBadge', function(event, data){
			//condition if menu check is active then show the badgeObtain
			if(data && $scope.$parent.parentCtrl.toggleLawCheckIcon){ 
				vm.lawbadgeGrade = data;	
			}
			
		});
/*
		$scope.$watch(angular.bind(this, function (lawbadgeGrade) {
			  return this.lawbadgeGrade;
			}), function (newVal, oldVal) {
			  console.log('Old value name: '+ oldVal +' Name changed to ' + newVal);
			  vm.badgeChanged = true;
		});*/

		$scope.$on('updateOrgBadge', function(event, data){	
			//condition if menu check is active then show the badgeObtain
			if(data && $scope.$parent.parentCtrl.toggleOrgCheckIcon){ 
				vm.orgbadgeGrade = data;	
			}
		});

		$scope.$on('updateCultBadge', function(event, data){	
			//condition if menu check is active then show the badgeObtain
			if(data && $scope.$parent.parentCtrl.toggleCultCheckIcon){ 
				vm.cultbadgeGrade = data;	
			}			
		});

		$scope.$on('updateTechBadge', function(event, data){	
			//condition if menu check is active then show the badgeObtain
			if(data && $scope.$parent.parentCtrl.toggleTechCheckIcon){ 
				vm.techbadgeGrade = data;	
			}
		});

		/*
			on lsTickStatusBrodacast from parent controller to update badge if all answered questioned
		*/
		$scope.$on('lsTickStatusBrodacast',function(event,data){
			//console.log('Brodcast recieved for lsTickStatus object' + data);
		});

		//Update Badges description models
		$scope.$on('updateLawBadgeDesc', function(event, data){	
			if(data && $scope.$parent.parentCtrl.toggleLawCheckIcon){ 
				vm.lawBadgeDescModel = data;	
			}
		});
		$scope.$on('updateOrgBadgeDesc', function(event, data){	
			if(data && $scope.$parent.parentCtrl.toggleOrgCheckIcon){ 
				vm.orgBadgeDescModel = data;	
			}
		});
		$scope.$on('updateCultBadgeDesc', function(event, data){	
			if(data && $scope.$parent.parentCtrl.toggleCultCheckIcon){ 
				vm.cultBadgeDescModel = data;	
			}
		});
		$scope.$on('updateTechBadgeDesc', function(event, data){	
			if(data && $scope.$parent.parentCtrl.toggleTechCheckIcon){ 
				vm.techBadgeDescModel = data;	
			}
		});

		//Update Form fields from local storage
		$scope.$on('updateFormField', function(event, data){			
			
			if(data && data.length != 0){
				
				//Update Form method invoked
				updateForm(data);	

				//CAll to update menu check icon
				updateNavbarIconState(data, vm.answeredQuestion);
			}
		});

		//On Save Form Data from parent controller save the form
		$scope.$on('saveFormData', function(event, data){

			event.preventDefault();

			if(data && data != undefined){

				//console.log('Save form trigger');

				var saveParameter = data,
					catType = saveParameter.catType,
					formName = saveParameter.formName,
					catScore = saveParameter.catScore,
					urlAction = saveParameter.urlAction;						
				
				//Trigger Next Page method
				vm.nextPageTrigger(catType, formName, catScore, urlAction);	

			}
		});

		function nextPageTrigger(categoryType, formName,cat_score, urlAction){
			
			if(arguments.length != 0){
				
				//Get the lsFormPageFlag after next method trigger called
				lsFormPageFlag = appFactory.getLSFormPage();

				var categoryType = arguments[0], formName = arguments[1];
				
				var formSerializeData = customSerializeArray(formName);
								
				//console.log(formSerializeData.length + ' Option choosed!');				

				//console.log('URL value ' +urlAction);

				//if(urlAction != 'fromNextBtn' || urlAction != 'landing' || urlAction != 'toelichting' || urlAction != 'resultaten'){
				//}
				

				if(cat_score != ''){
					vm.catTotalScore = cat_score;	
				}else{
					//console.log('Total cat_score value not obtained from JSON');
				}				

				//console.log(formSerializeData.length);

				//Call Save form 
				if(formSerializeData.length != 0 ){
					
					saveFormData(formName, categoryType, formSerializeData, cat_score);

					if(saveFormData){

						if(urlAction == 'fromNextBtn' && urlAction != undefined){

							actionFromNextButton(categoryType);
						}

						//IF urlAction coming from Top Menu and logo
						if(urlAction == 'landing' && urlAction != undefined){							
							redirect('/landing');							
						}

						if(urlAction == 'toelichting' && urlAction != undefined){							
							redirect('/toelichting');							
						}

						if(urlAction == 'wet-en-regelgeving' && urlAction != undefined){
							redirect('/wet-en-regelgeving');							
						}

						if(urlAction == 'organisatie' && urlAction != undefined){								
							redirect('/organisatie');						}

						if(urlAction == 'cultuur' && urlAction != undefined){							
							redirect('/cultuur');						}

						if(urlAction == 'techniek' && urlAction != undefined){
							redirect('/techniek');
						}

						if(urlAction == 'resultaten' && urlAction != undefined){							
							redirect('/resultaten');
						}
					}
					else{
						console.log('No parameter set at invoking function! Please set parameter : cat_type, form formName');
					}
				} //if end
				

				//Update the page if form length is empty and page is form page otherwise skip delete option for other pages
				if(lsFormPageFlag == 'validFormPage' && formSerializeData.length == 0){					
					emptyLocalDataOnFormEmpty(categoryType);
				}
				else{
					// console.log('No Form page ' + lsFormPageFlag);
				}

				//Take action if user hit from menu without form filling form data
				if(formSerializeData.length == 0 && urlAction != 'fromNextBtn'){		
					//console.log(urlAction);

					//Redirect the page	
					redirect('/'+urlAction);					
				}	

				//If user hit next button without form data filled
				if(formSerializeData.length == 0 && urlAction == 'fromNextBtn'){
					actionFromNextButton(categoryType);
				}

				/*
					If coming URL are from result, instruction and landing page and form lenth Zero
					nullifiy the form record and tips from in localStorage
				*/
				//if(urlAction != 'fromNextBtn' && urlAction != 'wet-en-regelgeving' && urlAction != 'organisatie' && urlAction != 'cultuur' && urlAction != 'techniek'){
				//} //If end for URL condition
				//if(urlAction == 'fromNextBtn' || urlAction == 'landing' || urlAction == 'toelichting' || urlAction == 'resultaten'){
				//}
				
					
			}//arguments 
										
		}//function end


		function emptyLocalDataOnFormEmpty(categoryType){
			
			if(!ifLocalStorageTrue){return;}

			if(categoryType !== undefined){

				var getFormData = JSON.parse(localStorage.getItem(categoryType));
				
				//console.log(getFormData);

				if(getFormData !== null){

					if('formRecords' in getFormData){

						//console.log(getFormData.formRecords);

						if(getFormData.formRecords.length != 0 && getFormData.formRecords.length != ''){

							getFormData.formRecords = [];
							getFormData.tips = [];
							getFormData.percentageObtained = 0;
							getFormData.totalQueAnswered = 0;
							getFormData.totalScoreGain = 0;

							if(getFormData.badgeObtained != '' && getFormData.badgeObtained != undefined){

								var splitBadgeObtain = getFormData.badgeObtained;

								var splitArray = splitBadgeObtain.match(/(\d+|\D+)/g);

								getFormData.badgeObtained = splitArray[0]+0;

								if(localStorage.getItem('lawBadgeObtain') && categoryType == 'law-regulation-set'){
									localStorage.setItem('lawBadgeObtain', getFormData.badgeObtained);
									localStorage.setItem('lsLawBadgeDesc', zeroBadgeDesc);
								}
								if(localStorage.getItem('orgBadgeObtain') && categoryType == 'organization-set'){
									localStorage.setItem('orgBadgeObtain', getFormData.badgeObtained);
									localStorage.setItem('lsOrgBadgeDesc', zeroBadgeDesc);
								}
								if(localStorage.getItem('cultBadgeObtain') && categoryType == 'culture-set'){
									localStorage.setItem('cultBadgeObtain', getFormData.badgeObtained);
									localStorage.setItem('lsCultBadgeDesc', zeroBadgeDesc);
								}
								if(localStorage.getItem('techBadgeObtain') && categoryType == 'technique-set'){
									localStorage.setItem('techBadgeObtain', getFormData.badgeObtained);
									localStorage.setItem('lsTechBadgeDesc', zeroBadgeDesc);
								}
							}

							localStorage.setItem(categoryType, JSON.stringify(getFormData));	
						}
						else{
							//console.log('Form records contains data in local');
						}

					}	
				}else{
					//console.log('There is no localStorage set for following ' + categoryType + ' yet!');
				}
			}
				
		}

		function actionFromNextButton(categoryType){
			if(categoryType != '' && categoryType != undefined){

				if(categoryType == 'law-regulation-set'){													
					redirect('/organisatie');
				}
				if(categoryType == 'organization-set'){														
					redirect('/cultuur');					
				}
				if(categoryType == 'culture-set'){							
					redirect('/techniek');
				}
				if(categoryType == 'technique-set'){								
					redirect('/resultaten');
				}	
			}
		}

		function previousPageTrigger(cType, fName){
			
			//console.log('PreviousPageTrigger fired');
			//console.log(arguments);

			if(cType == 'law-regulation-set'){
				redirect('/wet-en-regelgeving');
			}
			if(cType == 'organization-set'){
				redirect('/organisatie');
			}
			if(cType == 'culture-set'){
				redirect('/cultuur');
			}

		}

		function redirect(url){
			$rootScope.$evalAsync(function() {
				$location.url(url);
			});
		}

		//Getting form data
		function saveFormData(formName, categoryType, formSerializeData){

			//console.log(formSerializeData);

			if(formSerializeData.length !=0){

				//Calculate Total Score
				var newRecord = calculateTotalScore(formSerializeData, categoryType);

				//console.log(newRecord);

				//Set to localstorage
				setDataToLocalStorage(newRecord);

				return true;
			}// end if
		}

		//Getting Total score from form data submitted
		function calculateTotalScore(formSerializeData, categoryType){

			var reFormData = [],  newObj = {}, totalScoreGain = 0, percentageObtained = 0,
				pushObj, 
				tipsObj = [],
				optionsTotalScore = 0, 
				multiOptElement = $('.jsMultipleOptions'),
				catScore = vm.catTotalScore,
				badgeObtained = [],
				totalQueAnswered = 0;

			var formSerializeValue;


			angular.forEach(formSerializeData, function(obj,idx){
				
				if(obj.tip != '')
					tipsObj.push(obj.tip);

				formSerializeValue = parseInt(obj.value);

				newObj[obj.id] = formSerializeValue;				

				pushObj = $.extend({},newObj);				
				
				totalScoreGain += formSerializeValue;

			});


			//Add object to reformData
			reFormData.push(pushObj);
			
			//Calulate total score gained
			totalScoreGain = (totalScoreGain - multiOptionSubTotalScore());

			//Calulate total percentage obtained
			percentageObtained = Math.round((totalScoreGain/catScore) *100); //Math.floor(((totalScoreGain/catScore) *100));

			//Get total Question selection value
			totalQueAnswered = vm.answeredQuestion;
			
			//Caluclate badge obtained
			var badgeVal = (percentageObtained != '' ? assignBadge(percentageObtained, categoryType) : '');

			//console.log(badgeVal);

			if(categoryType == 'law-regulation-set'){

				localStorage.setItem("lawBadgeObtain", badgeVal);
				badgeObtained = badgeVal;
			}
			if(categoryType == 'organization-set'){
				localStorage.setItem("orgBadgeObtain", badgeVal);				
				badgeObtained = badgeVal;
			}
			if(categoryType == 'culture-set'){
				localStorage.setItem("cultBadgeObtain", badgeVal);	
				badgeObtained = badgeVal;
			}
			if(categoryType == 'technique-set'){
				localStorage.setItem("techBadgeObtain", badgeVal);
				badgeObtained = badgeVal;
			}


			return {
				categoryType: categoryType,
				categoryTotalScore : catScore,
				totalScoreGain : totalScoreGain,
				percentageObtained: percentageObtained,
				badgeObtained: badgeObtained,
				formRecords : reFormData,
				totalQueAnswered : totalQueAnswered,
				tips: tipsObj
			};

			//Empty reform data
			reFormData = [];

			/*console.log('Total score:  ' +totalScoreGain);
			console.log(JSON.stringify(reFormData));
			console.log('Form serializeArray data!  '+JSON.stringify(formSerializeData));	*/
		}

		function pushToBadeArrayModal(badgeObtained, badgeObtainedList, categoryType){

			if(badgeObtained != undefined && badgeObtained != ''){
				/*
				if(badgeObtainedList.indexOf(badgeObtained) == -1){


					badgeObtainedList.push(badgeObtained);	

					//Call to parent callback
					$scope.$emit('updateParentBadgeArray', badgeObtained);
				}*/
				
			}
			
		}

		function questionAnswered($event, cat_type){

			//console.log($event.currentTarget);

			vm.answeredQuestion = 0;

			$timeout(function(){
				
				$('.jsPrettyWrapper').each(function(){
					
					var me = $(this);

					if($(this).find('input:checked').length != 0){
						$(this).addClass('yesAnswered');
						//console.log('class dded ');
					}
					else{
						$(this).removeClass('yesAnswered');
						//console.log('removed');
					}

				});

				answeredQuestion();

			});
		}

		function answeredQuestion(){

			if($('.yesAnswered').length != 0){
				vm.answeredQuestion = $('.yesAnswered').length;
			}
			else{
				vm.answeredQuestion  = 0;	
			}
		}

		function setDataToLocalStorage(obj){
			if(!ifLocalStorageTrue()) {return};

			if(obj !== null){
				//console.log(obj);
				//var newObj = $.extend({},obj.formRecords);
				var newFormRecords = JSON.stringify(obj), 
					catName = obj.categoryType;
				
				localStorage.removeItem(catName);

				localStorage.setItem(catName,newFormRecords);

				//Set Default record
				//localStorage.setItem('lsLastCategoryRecord',newFormRecords);

				return true;
			}		
		}


		function ifLocalStorageTrue(){

			if("localStorage" in window && window['localStorage'] !== null){
				return true;
			}else{
				alert('Sorry, There is no support for localStorage available on browser.');
				return false;
			}
		}

		function updateForm(data){
			if(data && data.length != 0){

				var cType = data;

				if(cType != '' && cType != null){

					if(!ifLocalStorageTrue){return false;}

					var localStoreData = localStorage.getItem(cType);

					if(localStoreData != null && localStoreData != ''){

						localStoreData = JSON.parse(localStoreData);

						//console.log(localStoreData);

						if('formRecords' in localStoreData){

							var localFormRecords = localStoreData.formRecords[0], fieldArray = [];

							for(var key in localFormRecords){
								//console.log(key);
								fieldArray.push(key);
							}

							if(fieldArray != '' && fieldArray != null){
								for(var i=0; i<=fieldArray.length; i++){

									$('#'+fieldArray[i]).prop('checked',true).attr('checked',true);
									$('#'+fieldArray[i]).siblings('a').addClass('checked');
								}					
							}
						}else{
							//console.log('No localStoreData contain formRecords yet!');
						}

						//Update answer count model
						if('totalQueAnswered' in localStoreData){
							vm.answeredQuestion = localStoreData.totalQueAnswered;
						}

						//Update badge model
						if('badgeObtained' in localStoreData){
							vm.badgeName = localStoreData.badgeObtained;
						}
						
						//console.log(vm.answeredQuestion);

						$scope.$emit('recieveQuestionAnsweredCount', vm.answeredQuestion);
					}
					else{
						//console.log('No localStorage data saved yet! == Inside updateForm method');
					}
				}

				//Get badges from local storage
				getBagesFromLocal();

				//Get badges description from local storage
				getBagesDescFromLocal();
			
			}
		}

		function getBagesFromLocal(){
			//Update law badge
			var lsLawBadge = localStorage.getItem('lawBadgeObtain');

			if(lsLawBadge){
				$scope.$emit('updateLawBadge', lsLawBadge);
			}

			//Update org badge
			var lsOrgBadge = localStorage.getItem('orgBadgeObtain');
			if(lsOrgBadge){
				$scope.$emit('updateOrgBadge', lsOrgBadge);							
			}

			//Update cult badge
			var lsCulBadge = localStorage.getItem('cultBadgeObtain');
			if(lsCulBadge){
				$scope.$emit('updateCultBadge', lsCulBadge);
			}

			//Update tech badge
			var lsTechBadge = localStorage.getItem('techBadgeObtain');
			if(lsTechBadge){
				$scope.$emit('updateTechBadge', lsTechBadge);
			}
		}

		function getBagesDescFromLocal(){
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

		function updateNavbarIconState(cat_type, count){
			//Passing data for answered count
			//console.log('icon state method invoked');

			if(cat_type != '' && cat_type != undefined){

				var answerCountData =  {
					catType: cat_type,
					count: count
				}
				$scope.$emit('recieveQuestionAnsweredCount', answerCountData);	
			}
		}

		function multiOptionSubTotalScore(){
			var multiOptElement = '.jsMultipleOptions .jsPrettyOptionWrap > input[type="checkbox"]:checked',
				multiOptionTotalScore = 0;

			$('.jsPrettyWrapper').each(function(){

				var me = $(this),  multiOptionScore = 0, multiOptionSubValue = 0;

				me.find(multiOptElement).each(function(key2,ele){
					
					var me = $(ele),
						curVAl = me.val();

						multiOptionScore += parseInt(curVAl);

						if(multiOptionScore >=50){

							multiOptionSubValue = (multiOptionScore - 50);
							multiOptionScore = 50;

							multiOptionTotalScore += multiOptionSubValue;
							
							//console.log('Subtracted value multiOptionSubScore '+multiOptionSubValue);
						}

					//console.log('Multi Option Score '+multiOptionScore);
				});

			});

			return multiOptionTotalScore;
						
		}

		function assignBadge(percent, categoryType){
			var badge,  
				badgeCatType = categoryType;

			var badgeNameArray = [
				{
					catType : 'law-regulation-set',
					grade0 : 'lawBadge0',
					grade1 : 'lawBadge1',
					grade2 : 'lawBadge2',
					grade3 : 'lawBadge3'
					
				},
				{
					catType : 'organization-set',
					grade0 : 'orgBadge0',
					grade1 : 'orgBadge1',
					grade2 : 'orgBadge2',
					grade3 : 'orgBadge3'
				},
				{
					catType : 'culture-set',
					grade0 : 'cultBadge0',
					grade1 : 'cultBadge1',
					grade2 : 'cultBadge2',
					grade3 : 'cultBadge3'
				},
				{
					catType : 'technique-set',
					grade0 : 'techBadge0',
					grade1 : 'techBadge1',
					grade2 : 'techBadge2',
					grade3 : 'techBadge3'
				}

			];
				
			function badgeGrade(grade){

				var badgeGrade = '';
				if(badgeNameArray != null && badgeNameArray != '' && badgeCatType != '' && badgeCatType != null){

					angular.forEach(badgeNameArray, function(obj,idx){

						if(badgeCatType == obj.catType){
							
							badgeGrade = obj[grade];
							//console.log(obj[grade]);
						}

					});	

					return badgeGrade;
				}
			}

			if(percent != '' && percent != null && badgeCatType != '' && badgeCatType != null){
				
				if(percent < 5){					
					badge = badgeGrade('grade0');
				}
				if(percent >= 5 && percent <= 32){
					badge = badgeGrade('grade1');
				}
				if(percent >= 33 && percent <= 65){
					badge = badgeGrade('grade2');
				}
				if(percent >= 66){
					badge = badgeGrade('grade3');
				}

			}
			
			//Prepare badge description based on badge obtained
			setBadgeDescription(badge, badgeCatType);

			//Update BadgeName model
			$scope.$emit('updateBadgeName', badge);

			return badge;
		} //Assign badge end

		function setBadgeDescription(badgeObtain, catType){

			if(badgeObtain != '' && badgeObtain !== undefined){

				var orgBadgeDesc, cultBadgeDesc, techBadgeDesc, 
					commontText = "Je hebt een trofee verdiend!  <br />",
					zeroBadgeDesc = "Je hebt nog geen trofee verdiend.";

				var funcLawBadgeDesc = setLawBadgeDesc(commontText, badgeObtain);

				if(funcLawBadgeDesc !== undefined){

					var lawBadgeDescStr = funcLawBadgeDesc;

					//Update Law bade description
					$scope.$emit('updateLawBadgeDesc', lawBadgeDescStr);

					//Set to localStorage
					if(!ifLocalStorageTrue){return;}
					localStorage.setItem('lsLawBadgeDesc', lawBadgeDescStr);

				}

				var funcOrgBadgeDesc = setOrgBadgeDesc(commontText, badgeObtain);

				//console.log(funcOrgBadgeDesc);

				if(funcOrgBadgeDesc !== undefined){

					var orgBadgeDescStr = funcOrgBadgeDesc;

					//Update Law bade description
					$scope.$emit('updateOrgBadgeDesc', orgBadgeDescStr);

					//Set to localStorage
					if(!ifLocalStorageTrue){return;}
					localStorage.setItem('lsOrgBadgeDesc', orgBadgeDescStr);

				}

				var funcCultBadgeDesc = setCultBadgeDesc(commontText, badgeObtain);

				if(funcCultBadgeDesc !== undefined){

					var cultBadgeDescStr = funcCultBadgeDesc;

					//Update Law bade description
					$scope.$emit('updateCultBadgeDesc', cultBadgeDescStr);

					//Set to localStorage
					if(!ifLocalStorageTrue){return;}
					localStorage.setItem('lsCultBadgeDesc', cultBadgeDescStr);

				}

				var funcTechBadgeDesc = setTechBadgeDesc(commontText, badgeObtain);

				if(funcTechBadgeDesc !== undefined){

					var techBadgeDescStr = funcTechBadgeDesc;

					//Update Law bade description
					$scope.$emit('updateTechBadgeDesc', techBadgeDescStr);

					//Set to localStorage
					if(!ifLocalStorageTrue){return;}
					localStorage.setItem('lsTechBadgeDesc', techBadgeDescStr);

				}
			}

		}

		function setLawBadgeDesc(commontText, badgeObtain){

			var lawBadgeDescStr;


			if(badgeObtain == 'lawBadge0'){
				lawBadgeDescStr = zeroBadgeDesc;
			}

			if(badgeObtain == 'lawBadge1'){
				lawBadgeDescStr = "<strong>Op de goede weg:</strong> binnen jouw organisatie is een begin gemaakt met het inrichten van gezond en veilig werken, maar er is nog veel ruimte voor verbetering";
			}
			if(badgeObtain == 'lawBadge2'){
				lawBadgeDescStr = "<strong>Gaat je goed af:</strong> de basis van gezond en veilig werken is in jouw organisatie op orde, maar er is op enkele punten nog verbetering mogelijk";
			}
			if(badgeObtain == 'lawBadge3'){
				lawBadgeDescStr = "<strong>Zaken goed op orde:</strong> gezond en veilig werken is in jouw organisatie goed geregeld, de uitdaging is om het zo te houden";
			}

			return lawBadgeDescStr;
		}

		function setOrgBadgeDesc(commontText, badgeObtain){

			var orgBadgeDescStr;

			if(badgeObtain == 'orgBadge0'){
				orgBadgeDescStr = zeroBadgeDesc;
			}
			if(badgeObtain == 'orgBadge1'){
				orgBadgeDescStr = "<strong>Op de goede weg:</strong> binnen jouw organisatie is een begin gemaakt met het inrichten van gezond en veilig werken, maar er is nog veel ruimte voor verbetering";
			}
			if(badgeObtain == 'orgBadge2'){
				orgBadgeDescStr = "<strong>Gaat je goed af:</strong> de basis van gezond en veilig werken is in jouw organisatie op orde, maar er is op enkele punten nog verbetering mogelijk";
			}
			if(badgeObtain == 'orgBadge3'){
				orgBadgeDescStr = "<strong>Zaken goed op orde:</strong> gezond en veilig werken is in jouw organisatie goed geregeld, de uitdaging is om het zo te houden";
			}			

			return orgBadgeDescStr;
		}

		function setCultBadgeDesc(commontText, badgeObtain){

			var cultBadgeDescStr;

			if(badgeObtain == 'cultBadge0'){
				cultBadgeDescStr = zeroBadgeDesc;
			}
			if(badgeObtain == 'cultBadge1'){
				cultBadgeDescStr = "<strong>Op de goede weg:</strong> binnen jouw organisatie is een begin gemaakt met het inrichten van gezond en veilig werken, maar er is nog veel ruimte voor verbetering";
			}
			if(badgeObtain == 'cultBadge2'){
				cultBadgeDescStr = "<strong>Gaat je goed af:</strong> de basis van gezond en veilig werken is in jouw organisatie op orde, maar er is op enkele punten nog verbetering mogelijk";
			}
			if(badgeObtain == 'cultBadge3'){
				cultBadgeDescStr = "<strong>Zaken goed op orde:</strong> gezond en veilig werken is in jouw organisatie goed geregeld, de uitdaging is om het zo te houden";
			}

			return cultBadgeDescStr;
		}

		function setTechBadgeDesc(commontText, badgeObtain){

			var techBadgeDescStr;

			if(badgeObtain == 'techBadge0' || badgeObtain == undefined){
				techBadgeDescStr = zeroBadgeDesc;
			}
			if(badgeObtain == 'techBadge1'){
				techBadgeDescStr = "<strong>Op de goede weg:</strong> binnen jouw organisatie is een begin gemaakt met het inrichten van gezond en veilig werken, maar er is nog veel ruimte voor verbetering";
			}
			if(badgeObtain == 'techBadge2'){
				techBadgeDescStr = "<strong>Gaat je goed af:</strong> de basis van gezond en veilig werken is in jouw organisatie op orde, maar er is op enkele punten nog verbetering mogelijk";
			}
			if(badgeObtain == 'techBadge3'){
				techBadgeDescStr = "<strong>Zaken goed op orde:</strong> gezond en veilig werken is in jouw organisatie goed geregeld, de uitdaging is om het zo te houden";
			}

			return techBadgeDescStr;
		}


		function getBadgeFromLocalStorage(){

			if(!ifLocalStorageTrue){return;}

			var getBadge = localStorage.getItem();
		}

		function customSerializeArray(formName){

			var form = $('#'+formName), customArray = [];

			form.find('input:checked').each(function(idx,ele){					

				var id = $(ele).attr('id'), val = parseInt($(ele).val()), 
					tipInfo = $(ele).attr('data-tip'),
					customFormObj = {};

				customFormObj = { id : id, value : val, tip: tipInfo};

				customArray.push(customFormObj);

			});

			//console.log(customSerializeArray);
	
			return customArray;
		}
	}

})();
 ;(function(){
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
 ;(function(){
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
 ;(function(){
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
 ;(function(){
	'use strict';

	angular.module('satApplication')
		.controller('landingController',["$scope", "$http", "$location", "appFactory", landingController]);
		
		/* @ngInject */
		function landingController($scope,$http,$location, appFactory){

			//Set Valid Form page
			appFactory.setLSFormPage('invalidFormPage');

			var vm = this;

			vm.sectorList = [
			    "Landbouw, bosbouw en visserij", 
			    "Voeding en genot",
			    "Textiel, kleding en lederwaren",
			    "Houtindustrie",
			    "Papier, karton en drukkerijen",
			    "Aardolie, chemie, kunststof en rubber (ACKR)",
			    "Glas, keramische prod. en bouwmaterialen",
			    "Metaalproductenindustrie",
			    "Elektrotechnische industrie",
			    "Machine/apparaten ind. en reparatie",
			    "Transportmiddelenindustrie",
			    "Meubel",
			    "Energievoorziening",
			    "Water, afval en afvalwaterbeheer",
			    "Algemene bouw",
			    "Grond weg en waterbouw (GWW)",
			    "Gespecialiseerde bouw",
			    "Reparatie van auto's",
			    "Groothandel",
			    "Detailhandel",
			    "Vervoer over land",
			    "Opslag, post en koeriers",
			    "Horeca Logiesverstrekking",
			    "Restaurants en cafes",
			    "Uitgeverijen, radio en tv",
			    "IT-dienstverlening",
			    "Financiele instellingen Bankwezen",
			    "Verhuur van en handel in onroerend goed",
			    "Advisering, onderzoek en specifiek zakelijke dienstverlening",
			    "Verhuur van goed. en overige zak. Dienstverlening",
			    "Openbaar bestuur",
			    "Onderwijs",
			    "Gezondheidszorg",
			    "Verpleging en maatsch. dienstv.",
			    "Overige dienstverlening"
			  ];

			vm.companyList = ['1 tot 4', '5 tot 19', '20 tot 50', '50 tot 250', 'meer dan 250'];
			vm.lsSector = '';
			vm.lsCompany = '';

			//Get localStorage value for sector type and company size
			var sectorcompanyValue = appFactory.getLSValue('SAT.lsSectoryCompany');

			if(sectorcompanyValue !== undefined && sectorcompanyValue != ''){
				if(sectorcompanyValue.indexOf('|') != -1){
					var splitVal = sectorcompanyValue.split('|');
						vm.lsSector 	= splitVal[0],
						vm.lsCompany 	= splitVal[1]; 
					//console.log(vm.lsSector + ' ' + vm.lsCompany);
				}
			}

			//Invoke foe Google Analytic code
			appFactory.googleAnalyticsCall('landing');
 
            ga_storage._trackPageview('/landing');

		}
})();
 
 
 ;(function(){
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

 ;(function(){
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

 ;(function(){
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

 ;(function(){
	'use strict';

	angular.module('satApplication')
		.controller('cultureController',["$scope", "$http", "$location", 'dataservice', "$timeout", "appFactory", "$routeParams", "cultJSONPath", cultureController])
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
		function cultureController($scope,$http,$location, dataservice, $timeout, appFactory, $routeParams, cultJSONPath){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'cat_culture';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			vm.loadingFlag = true;

			//Set Valid Form page
			appFactory.setLSFormPage('validFormPage');


			//Setting cat_type to main controller model -- firing an event upwards
			$scope.$emit('updatePreviousValue', 'organization-set');

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
					
					if(catData != null && catData != 'undefined'){

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

		       return dataservice.getCategory(cultJSONPath)
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

			appFactory.googleAnalyticsCall('cultuur');
 
            ga_storage._trackPageview('/cultuur');

		}
})();

 ;(function(){
	'use strict';

	angular.module('satApplication')
		.controller('techniekController',["$scope", "$http", "$location", 'dataservice', "$timeout", "appFactory", "$routeParams", "techJSONPath", techniekController])
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
		function techniekController($scope,$http,$location, dataservice, $timeout, appFactory, $routeParams, techJSONPath){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'cat_techniek';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			vm.loadingFlag = true;


			//Set Valid Form page
			appFactory.setLSFormPage('validFormPage');

			//Setting cat_type to main controller model -- firing an event upwards
			$scope.$emit('updatePreviousValue', 'culture-set');

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
					
					if(catData != null && catData != 'undefined'){

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

		       return dataservice.getCategory(techJSONPath)
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
			appFactory.googleAnalyticsCall('techniek');

		}
})();

 ;(function(){
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

 ;(function(){
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
