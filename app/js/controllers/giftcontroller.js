'use strict';

angular.module('fantasyApp.controllers.gift', ['fantasyApp.services.gift','fantasyApp.services.login'])
    .controller('GiftController', ['$scope', 'giftService','loginService',
        function ($scope, giftService, loginService) {

            $scope.gifts = {};
            var user_id;
            var promise = loginService.isLoggedIn();
            promise.then(function(value) {
                user_id = value;
                console.log("Gift Controller User Id: " + user_id);
                if (!(user_id === 0)) {
                    console.log("Querying Gifts with user_id: " + user_id);
                    refreshGifts(user_id);

                }
                else {
                    console.log("Cannot retrieve gifts as user not logged in");
                }

            },null,null);


            var refreshGifts = function (id) {
                giftService.resource.get({use_status: "not used", user_id: id},function(response) {
                    console.log("Gift Controller--returned promotions");
                    console.log(response);
                    $scope.gifts = response.Promotions;
                });
            };

            $scope.convertDate = function(dbDate) {
                var date = new Date(dbDate);
                return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
            };


            $scope.redeemPromotion = function(giftIndex) {
                console.log("Promoton being redeemed!");
                var toRedeem = $scope.gifts[giftIndex];
                giftService.redeem.save(toRedeem, function(value, responseHeader) {
                    console.log("Response from trying to redeem promotion");
                    console.log(value);
                    refreshGifts(user_id);
                })
                // var newUser = new userTest();
                // newUser.first_name = user.first_name;
                // newUser.last_name = user.last_name;
                // newUser.gender = user.gender;
                // console.log(newUser);
                // // userTest.save({user_id:user.user_id}, newUser, function(value, responseHeader) {
                // //     console.log(value);
                // // });
                // userTest.save([], newUser, function(value, responseHeader) {
                //     console.log(value);
                // });
            };

    }]);