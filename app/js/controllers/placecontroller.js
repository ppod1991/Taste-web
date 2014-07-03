'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'placeService',
    function($scope, $routeParams, placeService) {
    	var params = $routeParams;
    	console.log(params);
    	console.log(params.store_id);
    	$scope.place_id = params.store_id;
    	console.log("Place ID: " + $scope.place_id);
    	placeService.setNewStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;

    }]);
