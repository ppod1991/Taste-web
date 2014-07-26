'use strict';
 
angular.module('fantasyApp.services.stats', ['ngResource'])
    .factory('statsService', ['$resource',
        function($resource) {
            //return $resource("http://www.getTaste.co/users/:user_id",{user_id:'@user_id'});            
            //console.log("Returning gift resource");
            return {
                resource: $resource("/stats/:store_id")
                };                 
        }])