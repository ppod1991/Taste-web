'use strict';

// Declare app level module which depends on filters, and services
angular.module('fantasyApp.config', ['ngRoute'])

app.config(['$routeProvider','$locationProvider', 
    function($routeProvider,$locationProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider
      .when('/', { redirectTo: '/signin' })
      .when('/signin',  { templateUrl: 'views/users/signin.html' })
      .when('/snaps/create', { templateUrl: 'views/snaps/create.html'})
      .when('/feed', { templateUrl: 'views/feed/feed.html'})
      .when('/fans/find', { templateUrl: 'views/fans/fanSearch.html'})
      .when('/places/:store_id',{ templateUrl: 'views/places/place.html'})
      .otherwise(       { redirectTo: '/' });

      //$locationProvider.html5Mode(true);
      
    }])
.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {

        $rootScope.$on('$routeChangeStart', function (event) {
            loginService.isLoggedIn();
            if (loginService.getUser()===0) {
                console.log('DENY');
                event.preventDefault();
                // $locationProvider.html5mode(true);
                //$location.path('/signin');
                // $locationProvider.html5mode(false);
            }
            else {
                console.log('ALLOW');
                //$location.path('/feed');
            }
        });
}]);
  
  // // establish authentication
  // .run(['angularFireAuth', 'FBURL', '$rootScope', 
  //   function(angularFireAuth, FBURL, $rootScope) {
  //     angularFireAuth.initialize(new Firebase(FBURL), {scope: $rootScope, name: 'auth', path: '/signin'});
  //     $rootScope.FBURL = FBURL;
  //   }])

  // // your Firebase URL goes here
  // // should look something like: https://blahblahblah.firebaseio.com
  // .constant('FBURL', 'https://ppodfootball.firebaseIO.com/')


