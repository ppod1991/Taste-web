'use strict';

angular.module('fantasyApp.controllers.userTest', ['fantasyApp.services.userTestService'])
    .controller('userTestController', ['$scope', 'userTest',
        function ($scope, userTest) {

            $scope.users = {};

            userTest.query(function(response) {
                $scope.users = response;
            });


            $scope.addUser = function(user) {
                var newUser = new userTest();
                newUser.first_name = user.first_name;
                newUser.last_name = user.last_name;
                newUser.last_gender = user.last_gender;
                console.log(newUser);
                // userTest.save({user_id:user.user_id}, newUser, function(value, responseHeader) {
                //     console.log(value);
                // });
                userTest.save([], newUser, function(value, responseHeader) {
                    console.log(value);
                });
            };

    }]);