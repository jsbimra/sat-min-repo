(function(){
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
 
 