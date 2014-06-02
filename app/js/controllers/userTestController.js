'use strict';

angular.module('fantasyApp.controllers.userTest', ['fantasyApp.services.userTestService'])
    .controller('userTestController', ['$scope', 'userTest',
        function ($scope, userTest) {

            $scope.users = {};

            userTest.query(function(response) {
                $scope.users = response;
            });


            $scope.addUser = function(user) {
                console.log(user);
                var newUser = new userTest();
                newUser.name = user.name;
                newUser.user_id = user.user_id;
                console.log(newUser);
                userTest.save({user_id:user.user_id}, newUser, function(value, responseHeader) {
                    console.log(value);
                });
            };

    }]);