'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'placeService',
    function($scope, placeService) {
        $scope.meta = placeService.getMeta();
    }]);
