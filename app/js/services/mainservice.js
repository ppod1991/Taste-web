'use strict';
 
angular.module('fantasyApp.services.main',[])
    .factory('mainService', ['$http',
        function($http) {
         
           var meta = {title: '',
                       background_url: '',
                       kind:'default'
                        };

       	    return {
                setDefaultParameters: function() {
                    console.log("Set Default Parameters called");
                    meta = {title: 'TASTE',
                    background_url: './img/main_background_image.jpg',
                    kind: 'default' }
                },
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
                                background_url: snapParams.store_picture_url,
                                store_street_address: snapParams.street_address,
                                store_city: snapParams.city,
                                store_state: snapParams.state,
                                store_zipcode: snapParams.zipcode,
                                store_phone_number: snapParams.phone_number,
                                store_location_url: 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBCQQIP0nd-53kKK8DG56c_seCbwoH2jj0&q=' + encodeURIComponent(snapParams.store_name) + "+" + encodeURIComponent(snapParams.street_address) + "+" + encodeURIComponent(snapParams.city) + "+" + encodeURIComponent(snapParams.state) + "+" + encodeURIComponent(snapParams.zipcode),
                                store_yelp_url: snapParams.yelp_url,
                                store_description: snapParams.store_description,
                                store_latitude: snapParams.store_latitude,
                                store_longitude: snapParams.store_longitude,
                                user_first_name: snapParams.first_name,
                                kind: 'restaurant'
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