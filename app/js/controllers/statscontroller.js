'use strict';

angular.module('fantasyApp.controllers.stats', ['fantasyApp.services.stats','fantasyApp.services.login','fantasyApp.services.main'])
    .controller('StatsController', ['$scope','$routeParams', 'statsService','loginService','mainService',
        function ($scope, $routeParams,statsService, loginService, mainService) {
            mainService.setDefaultParameters();
            $scope.stats = {};
            var store_id = $routeParams.store_id;

            statsService.resource.get({store_id: store_id},function(response) {
                    console.log("Stats Controller--returned stats");
                    console.log(response);
                    $scope.stats = response.stats;
                });
            

    }]);