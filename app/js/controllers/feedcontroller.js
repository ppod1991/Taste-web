'use strict';
 
angular.module('fantasyApp.controllers.feed', ['fantasyApp.services.feed'])
    .controller('FeedController', ['$scope', '$location', 'angularFire', 'Feed',
        function($scope, $location, angularFire, Feed) {
     
            $scope.getStories = function() {
                $scope.stories = Feed.collection();
            }
 
}])