'use strict';
 
angular.module('fantasyApp.controllers.snaps', ['fantasyApp.services.snaps'])
    .controller('SnapsController', ['$scope','$routeParams', '$location', 'angularFire', 'Snaps', 'loginService',
        function($scope, $routeParams, $location, angularFire, Snaps, loginService) {
 
            $scope.snap = {};

            $scope.createSnap = function() {
                var snapId = Snaps.create($scope.snap.store, $scope.snap.clothing, $scope.auth.id,function(err) {
                    if (!err) {
                        $scope.snap = null;
                        $location.path('/snaps/create');
                        $scope.$apply();
                    }
                });
                $scope.snap = null;
                $location.path('/snaps/');
            }
             
}])