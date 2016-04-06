(function(){
    'use strict';

    angular.module('satApplication')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {
        return {
            getCategory: getCategory
        };

        function getCategory() {

            return $http.get('lawAndRegulations/wet-en-regelgeving.JSON')
                .then(getCategoryComplete)
                .catch(getCategoryFailed);

            function getCategoryComplete(response) {
                return response.data;

            }

            function getCategoryFailed(error) {
                console.log('XHR Failed for fetch page data.' + error.data);
            }
        }
    }


})();