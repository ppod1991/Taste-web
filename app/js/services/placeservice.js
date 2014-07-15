'use strict';
 
angular.module('fantasyApp.services.place',[])
    .factory('placeService', ['$http',
        function($http) {
         
           var meta = {};
       	    return {
        		setNewStoreParameters: function(snap_id) {
                    var promise = $http.get("/snaps/" + snap_id)
                        .then(function(response) {
                            var snapParams = response.data;
                            console.log("Set New Store Parameters called with place_id: " + snap_id);
                            //console.log("Store Params:");
                            //console.log(storeParams);
                            var newMeta = {
                                title: snapParams.store_name,
                                hashtag_text: snapParams.hashtag_text,
                                picture_URL: snapParams.snap_URL,
                                store_id: snapParams.store_id,
                                snap_id: snapParams.snap_id
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