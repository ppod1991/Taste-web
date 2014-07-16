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
                                snap_id: snapParams.snap_id,
                                store_pic_url: snapParams.store_picture_url,
                                store_street_address: snapParams.street_address,
                                store_city: snapParams.city,
                                store_state: snapParams.state,
                                store_zipcode: snapParams.zipcode,
                                store_phone_number: snapParams.phone_number,
                                store_location_url: 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBCQQIP0nd-53kKK8DG56c_seCbwoH2jj0&q=' + encodeURIComponent(snapParams.store_name) + "+" + encodeURIComponent(snapParams.street_address) + "+" + encodeURIComponent(snapParams.city) + "+" + encodeURIComponent(snapParams.state) + "+" + encodeURIComponent(snapParams.zipcode),
                                store_yelp_url: snapParams.yelp_url,
                                store_description: snapParams.store_description
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