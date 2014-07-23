'use strict';

angular.module('fantasyApp.controllers.place', ['fantasyApp.services.main','fantasyApp.services.login','ngResource'])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'mainService', 'loginService','$resource','$q','$location','$window',
    function($scope, $routeParams, mainService,loginService, $resource, $q, $location,$window) {
    	var params = $routeParams;
    	//console.log("Params:" + params);
    	//console.log(params.store_id);
    	$scope.snap_id = params.snap_id;
        //$scope.isFirstPromotion = true;

        $scope.isFirstPromotion = false;
        var childMeta = mainService.setNewStoreParameters($scope.snap_id).then(function(meta) {
            console.log("Child Meta:");
            if (meta.data === '') {
                $location.path('/');
            }
            console.log(meta);

            $scope.childMeta = meta;
            var expiration_date = new Date($scope.childMeta.referral_expiration_date);
            var now_date = new Date();
            var differenceMS = expiration_date-now_date;
            if (differenceMS / (24*60*60*1000) > 1.5){
                $scope.timeRemaining = differenceMS / (24*60*60*1000);
                if (Math.floor($scope.timeRemaining)===1)
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' day';
                else
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' days';

            }
            else if (differenceMS / (60*60*1000) > 1) {
                $scope.timeRemaining = differenceMS / (60*60*1000);
                if (Math.floor($scope.timeRemaining)===1)
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' hour';
                else
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' hours';
            }
            else {
                $scope.timeRemaining = differenceMS / (60*1000);
                if (Math.floor($scope.timeRemaining)===1)
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' minute';
                else
                    $scope.timeRemainingText = Math.floor($scope.timeRemaining) + ' minutes';
            }
            console.log("$scope.timeRemaining: " + $scope.timeRemaining);
            console.log("$scope.childMeta.referring_user_id",$scope.childMeta.referring_user_id);
            //return meta;

        },function(err) {
            console.log("ERROR IN SET STORE PARAMETERS PROMISE");
            $location.path('/');
            // $scope.$apply();
            console.log("path SHOULD change");
            //return $q.reject(err);
            
            
        });



        var promise = loginService.isLoggedIn();
        promise.then(function(value) {
            //console.log("Promise being completed");
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
        



        // $scope.login = function () {
        //     $window.location.href = '/auth/facebook/q?location=' + encodeURIComponent($location.url());
        // }

        $scope.addPromotion = function() {
            var promotion_display_text;
            if ($scope.isFirstPromotion) {
                promotion_display_text = "$2 Gift for each person in your party!";
            }
            else {
                promotion_display_text = "$1 Gift for each person in your party!";
            }

            console.log("ADDING PROMOTION! ");
            $resource("/promotions").save([],{user_id:loginService.getUser(), store_id:$scope.childMeta.store_id,first_time:true,display_text:promotion_display_text,referring_user_id:$scope.childMeta.referring_user_id},function(val, responseHeader) {
                if (val.promotion_added) {
                    console.log("New Promotion Successfully Added!");
                }
                else {
                    console.log("New Promotion Not Added");
                }
                $scope.isFirstPromotion = false;
                $location.path('/gifts')
            });  

        };





    	//$scope.childMeta = placeService.setNewStoreParameters($scope.place_id);
    	// $scope.title = storeParams.store_name;
    	// $scope.hashtag_text = storeParams.hashtag_text;
    	// $scope.picture_URL = storeParams.store_picture_URL;

    }]);
