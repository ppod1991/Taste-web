'use strict';
 
angular.module('fantasyApp.services.place', ['ngResource'])
    .factory('placeService', ['$resource',
        function($resource) {
        	return {
        		getStoreParameters: function(place_id) {
                    var storeParams= $resource("http://localhost:5000/store/" + place_id).get(function () {
                        console.log('Store Params:');
                        console.log(storeParams);
                        return storeParams;
                    });
			        
        		}
        	}
        }]);