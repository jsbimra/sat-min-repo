(function(){
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