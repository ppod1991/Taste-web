'use strict';
 
angular.module('fantasyApp.controllers.feed', ['fantasyApp.services.feed'])
    .controller('FeedController', ['$scope', '$location', 'angularFire', 'Feed', 'loginService',
        function($scope, $location, angularFire, Feed, loginService) {
     
            $scope.getStories = function() {
                $scope.stories = Feed.collection($scope.auth);
                //console.log($scope.stories);
            }
 
}])