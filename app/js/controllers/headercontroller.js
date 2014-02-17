'use strict';

angular.module('fantasyApp.controllers.header', ['fantasyApp.services.login'])
  .controller('HeaderController', ['$scope', '$location', 'loginService', 'angularFire', 'FBURL', 
    function($scope, $location, loginService, angularFire, FBURL) {

       $scope.$on("angularFireAuth:login", function() {
      //   angularFire(new Firebase(FBURL+'/users/'+$scope.auth.id), $scope, 'user');
           $location.path('/feed');
       });

      $scope.$on("angularFireAuth:logout", function() {
        $location.path('/signin')
      });

      $scope.logout = function() {
        loginService.logout();
      };

      $scope.navbarEntries = [
        {
          "title": "Fan Feed",
          "link": "/feed"
       }
       , {
          "title": "New Snap",
          "link": "/snaps/create"
        }
        , {
           "title": "Find Friends",
           "link": "/fans/find"
         }
      ];

      $scope.$on('$routeChangeSuccess',function() {
        $scope.navbarEntries.forEach(
          function(data) {
            data.isActive = ($location.path().indexOf(data.link) == 0);
          })
      })
    }])