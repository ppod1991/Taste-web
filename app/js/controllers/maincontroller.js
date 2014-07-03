'use strict';

angular.module('fantasyApp.controllers.main', ['fantasyApp.services.place'])
  .controller('MainCtrl', ['$scope', 'placeService',
    function($scope, placeService) {
        $scope.meta = placeService.getMeta();
    }]);
