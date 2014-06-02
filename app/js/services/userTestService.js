'use strict';
 
angular.module('fantasyApp.services.userTestService', ['ngResource'])
    .factory('userTest', ['$resource',
        function($resource) {
            return $resource("http://desolate-plateau-4658.herokuapp.com/users/:user_id",{user_id:'@user_id'});            
        }])