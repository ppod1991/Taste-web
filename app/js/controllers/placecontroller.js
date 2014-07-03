'use strict';

angular.module('fantasyApp.controllers.place', ['ngRoute','fantasyApp.services.place'])
  .controller('PlaceCtrl', ['$scope', '$route', 'placeService',
    function($scope, $routeParams, placeService) {
    	var params = $route.current.params;
    	console.log(params);
    	console.log(params.store_id);
    	$scope.place_id = params.store_id;
    	console.log("Place ID: " + $scope.place_id);
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

