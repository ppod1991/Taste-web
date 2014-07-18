'use strict';
 
angular.module('fantasyApp.services.gift', ['ngResource'])
    .factory('giftService', ['$resource',
        function($resource) {
            //return $resource("http://desolate-plateau-4658.herokuapp.com/users/:user_id",{user_id:'@user_id'});            
            //console.log("Returning gift resource");
            return {
                resource: $resource("/promotions"),
                redeem: $resource("/promotions/redeem")
                };                 
        }])