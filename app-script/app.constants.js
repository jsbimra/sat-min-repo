
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