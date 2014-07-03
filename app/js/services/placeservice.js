'use strict';
 
angular.module('fantasyApp.services.place', ['ngResource'])
    .factory('placeService', ['$resource',
        function($resource) {
        	return {
        		getStoreParameters: function(place_id) {
                    var storeParams= $resource("http://desolate-plateau-4658.herokuapp.com/stores/" + place_id).get(function () {
                        console.log('Store Params:');
                        console.log(storeParams);
                        storeParams = storeParams[0];
                        console.log(storeParams);
                        return storeParams;
                    });
			        
        		}
        	}
        }]);