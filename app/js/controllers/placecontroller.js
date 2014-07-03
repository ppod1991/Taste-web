'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', placeService,
    function($scope, $routeParams, placeService) {
    	$scope.place_id = $routeParams.store_name;
    	//var storeParams = placeService.getStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;
    	$scope.title = 'Woo title';
    	$scope.hashtag_text = 'Woo HashtagText';
    	$scope.picture_URL = 'www.wooURL.com';
    }])
