'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.place','fantasyApp.services.login','ngResource'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'placeService', 'loginService','$resource','$q',
    function($scope, $routeParams, placeService,loginService, $resource, $q) {
    	var params = $routeParams;
    	//console.log("Params:" + params);
    	//console.log(params.store_id);
    	$scope.snap_id = params.snap_id;
        //$scope.isFirstPromotion = true;

        $scope.isFirstPromotion = true;

        var childMeta = placeService.setNewStoreParameters($scope.snap_id).then(function(meta) {
            //console.log("Child Meta:");
            //console.log(meta);
            $scope.childMeta = meta;
        });

        var promise = loginService.isLoggedIn();
        promise.then(function(value) {
            console.log("Promise being completed");
            var user_id = value;
            var isFirstPromotion = $resource("/promotions/isFirstPromotion",{user_id:user_id, snap_id:$scope.snap_id}).get(function () {
                console.log("isFirstPromotion called and returned: ");
                console.log(isFirstPromotion);
                if (user_id === 0) {
                    $scope.isFirstPromotion = false;
                    console.log("User ID is 0!");
                }
                else {
                    $scope.isFirstPromotion = isFirstPromotion.isFirstPromotion;
                }

            });
        },null,null);
        // var user_id = loginService.getUser();
        // console.log("Currently stored User_ID = " + user_id);
        



        
        $scope.addPromotion = function() {
            console.log("ADDING PROMOTION! ");
            $resource("/promotions").save([],{user_id:loginService.getUser(), store_id:$scope.childMeta.store_id,first_time:true},function(val, responseHeader) {
                console.log("New Promotion Added!");
                console.log(val);
                console.log("Response Header");
                console.log(responseHeader);
                $scope.isFirstPromotion = false;
            });  

        };






    	//$scope.childMeta = placeService.setNewStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;

    }]);
