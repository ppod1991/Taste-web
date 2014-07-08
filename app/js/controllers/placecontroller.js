'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place','fantasyApp.services.login','ngResource'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'placeService', 'loginService','$resource',
    function($scope, $routeParams, placeService,loginService, $resource) {
    	var params = $routeParams;
    	console.log("Params:" + params);
    	//console.log(params.store_id);
    	$scope.place_id = params.store_id;
    	console.log("Place ID: " + $scope.place_id);
        $scope.isFirstPromotion = true;


        var isFirstPromotion = $resource("/promotions/isFirstPromotion",{user_id:loginService.getUser(), store_id:$scope.place_id}).get(function () {
            console.log("isFirstPromotion called and returned: " + isFirstPromotion);
            $scope.isFirstPromotion = isFirstPromotion;
        });


        $scope.addPromotion = function() {
            console.log("ADDING PROMOTION! ");
            $resource("/promotions").save([],{user_id:loginService.getUser(), store_id:$scope.place_id,first_time:true},function(val, responseHeader) {
                console.log("New Promotion Added!");
                console.log(val);
                console.log("Response Header");
                console.log(responseHeader);
            });  

        };

    	var childMeta = placeService.setNewStoreParameters($scope.place_id).then(function(meta) {
    		console.log("Child Meta:");
    		console.log(meta);
    		$scope.childMeta = meta;
    	});




    	//$scope.childMeta = placeService.setNewStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;

    }]);
