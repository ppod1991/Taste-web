'use strict';
 
angular.module('fantasyApp.services.place', ['ngResource'])
    .factory('placeService', ['$resource',
        function($resource) {

            var meta = {};
       	    return {
        		setNewStoreParameters: function(place_id) {
                    var storeParams= $resource("http://desolate-plateau-4658.herokuapp.com/stores/" + place_id).get(function () {
                        console.log("Set New Store Parameters called with place_id: " + place_id);
                        console.log("Store Params:");
                        console.log(storeParams);
                        meta = {
                            title: storeParams.store_name,
                            hashtag_text: storeParams.hashtag_text,
                            picture_URL: storeParams.store_picture_URL
                        };

                        return meta;
                    });
			        
        		},
                getMeta: function() { return meta; }
        	}
        }]);