'use strict';
 
angular.module('fantasyApp.services.gift', ['ngResource'])
    .factory('giftService', ['$resource',
        function($resource) {
            //return $resource("http://www.getTaste.co/users/:user_id",{user_id:'@user_id'});            
            //console.log("Returning gift resource");
            return {
                resource: $resource("/promotions"),
                redeem: $resource("/promotions/redeem")
                };                 
        }])