'use strict';

angular.module('fantasyApp.controllers.fans', ['fantasyApp.services.fans'])
    .controller('FansController', ['$scope', 'Fans', 'loginService',
        function ($scope, Fans, loginService) {

            $scope.users = {};

            $scope.findUsers = function() {
                $scope.users = Fans.collection();

                console.log($scope.users);
            }

            $scope.sendFriendRequest = function(user,userIndex) {
                Fans.friendRequest($scope.auth.id,user);
                var listOfUsers = $scope.users;
                var arr2 = listOfUsers.slice(0);
                console.log(arr2.length);
                arr2.splice(userIndex,1);

                var a = listOfUsers.splice(userIndex,1);
                console.log(arr2.length);
                console.log(arr2);
                console.log(listOfUsers);
                

                $scope.users = listOfUsers;
            }

    }]);