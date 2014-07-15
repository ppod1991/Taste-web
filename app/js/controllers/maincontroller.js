'use strict';

angular.module('fantasyApp.controllers.main', ['fantasyApp.services.place'])
  .controller('MainCtrl', ['$scope', 'placeService',
    function($scope, placeService) {
        //console.log("Main getMeta called");

        $scope.placeService = placeService;
        // console.log("Main Meta:");
        // console.log($scope.meta);
    }]);
