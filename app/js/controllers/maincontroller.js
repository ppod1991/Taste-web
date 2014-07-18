'use strict';

angular.module('fantasyApp.controllers.main', ['fantasyApp.services.main'])
  .controller('MainCtrl', ['$scope', 'mainService',
    function($scope, mainService) {
        //console.log("Main getMeta called");

        $scope.main = mainService;
        // console.log("Main Meta:");
        // console.log($scope.meta);
    }]);
