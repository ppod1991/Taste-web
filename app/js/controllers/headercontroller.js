'use strict';

angular.module('fantasyApp.controllers.header', ['fantasyApp.services.login'])
  .controller('HeaderController', ['$scope', '$location', 'loginService', '$window','angularFire', 
    function($scope, $location, loginService, $window,angularFire) {
      
      $scope.auth = 0;

      $scope.$watch(loginService.getUser, function (value, oldValue) {
        //console.log("$scope.$watch called with val: " + value + " and old Value of: " + oldValue);
        //console.log($scope);
        if(!value && oldValue) {
          console.log("Disconnect");
          $scope.auth = 0;
          $location.path('/signin');
        }

        if(value > 0) {
          //console.log("Connect with value: " + value);
          $scope.auth = value;
        }

      }, true);

      $scope.login = function () {
          $window.location.href = '/auth/facebook/q?location=' + encodeURIComponent($location.url());
      }


      $scope.logout = function () {
        $window.location.href = '/logout/q?location=' + encodeURIComponent($location.url());
      }
      //  $scope.$on("angularFireAuth:login", function() {
      // //   angularFire(new Firebase(FBURL+'/users/'+$scope.auth.id), $scope, 'user');
      //      $location.path('/feed');
      //  });

      // $scope.$on("angularFireAuth:logout", function() {
      //   $location.path('/signin')
      // });

      // $scope.logout = function() {
      //   loginService.logout();
      // };

      // $scope.login = function(callback) {
      //   $scope.err = null;
      //   loginService.login('/feed', function(err, user) {
      //     $scope.err = err||null;
      //     typeof(callback) === 'function' && callback(err, user);
      //   });
      // };
      
      // $scope.navbarEntries = [
      //   {
      //     "title": "Fan Feed",
      //     "link": "/feed"
      //  }
      //  , {
      //     "title": "New Snap",
      //     "link": "/snaps/create"
      //   }
      //   , {
      //      "title": "Find Friends",
      //      "link": "/fans/find"
      //    }
      // ];

      $scope.navbarEntries = [
        {
          "title": "My Gifts",
          "link": "/gifts"
       }
       , {
          "title": "Get App",
          "link": "/app"
        }
      ];

      $scope.$on('$routeChangeSuccess',function() {
        $scope.navbarEntries.forEach(
          function(data) {
            data.isActive = ($location.path().indexOf(data.link) == 0);
          })
      })
    }])