(function(){
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