'use strict';
 
angular.module('fantasyApp.services.userTestService', ['ngResource'])
    .factory('userTest', ['$resource',
        function($resource) {
            //return $resource("http://www.getTaste.co/users/:user_id",{user_id:'@user_id'});            
            
            
            return $resource("/users/:user_id",{user_id:'@user_id'});            
        
        }])