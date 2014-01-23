'use strict';

angular.module('fantasyApp.controllers.fans', ['fantasyApp.services.fans'])
    .controller('FansController', ['$scope','$routeParams', 'angularFire', 'Fans', 'loginService',
        function ($scope, $routeParams, angularFire, Fans, loginService) {

            $scope.users = {};

            $scope.findUsers = function() {
                $scope.users = Fans.collection();
            }

            $scope.addAsFriend = function(user) {
                $scope.users = Fans.create($scope.auth.id,user);
            }

    }]);