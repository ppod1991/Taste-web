'use strict';
 
angular.module('fantasyApp.services.place',[])
    .factory('placeService', ['$http',
        function($http) {
         
           var meta = {};
       	    return {
        		setNewStoreParameters: function(place_id) {
                    var promise = $http.get("/stores/" + place_id)
                        .then(function(response) {
                            var storeParams = response.data;
                            console.log("Set New Store Parameters called with place_id: " + place_id);
                            //console.log("Store Params:");
                            //console.log(storeParams);
                            var newMeta = {
                                title: storeParams.store_name,
                                hashtag_text: storeParams.hashtag_text,
                                picture_URL: storeParams.store_picture_url,
                                store_id: storeParams.store_id
                            };
                            meta = newMeta;
                            console.log("New Meta:");
                            console.log(meta);
                            return meta;   
            		      });
                        return promise;
                    },
                getMeta: function() { 
                    // console.log("getMeta called with: ");
                    // console.log(meta);
                    return meta; 
                }
        	}
        }]);