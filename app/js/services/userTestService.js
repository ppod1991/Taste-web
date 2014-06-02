'use strict';
 
angular.module('fantasyApp.services.userTestService', ['ngResource'])
    .factory('userTest', ['$resource',
        function($resource) {
            return $resource("http://limitless-sands-6367.herokuapp.com/users/:user_id",{user_id:'@user_id'});            
        }])