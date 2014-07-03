'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'placeService',
    function($scope, $routeParams, placeService) {
    	console.log($routeParams);
    	$scope.place_id = $routeParams.store_id;
    	console.log("Place ID: " + $routeParams.store_id);
    	var storeParams = placeService.getStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;
    	$scope.meta = {
    		title: storeParams.store_name,
    		hashtag_text: storeParams.hashtag_text,
    		picture_URL: storeParams.store_picture_URL
    	};
    }]);

