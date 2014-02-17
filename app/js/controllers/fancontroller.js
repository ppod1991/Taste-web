'use strict';

angular.module('fantasyApp.controllers.fans', ['fantasyApp.services.fans'])
    .controller('FansController', ['$scope','$routeParams', 'angularFire', 'Fans', 'loginService',
        function ($scope, $routeParams, angularFire, Fans, loginService) {

            $scope.users = {};

            $scope.findUsers = function() {
                $scope.users = Fans.collection();
            }

            $scope.sendFriendRequest = function(user) {
                $scope.users = Fans.friendRequest($scope.auth.id,user);
            }

    }]);