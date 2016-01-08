/*jshint sub:true*/
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
