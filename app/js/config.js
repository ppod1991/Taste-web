'use strict';

// Declare app level module which depends on filters, and services
angular.module('fantasyApp.config', ['ngRoute'])

app.config(['$routeProvider','$locationProvider','$sceDelegateProvider',
    function($routeProvider,$locationProvider,$sceDelegateProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider
      .when('/',{redirectTo:'/gifts'})
      .when('/signin',  { templateUrl: 'views/users/signin.html' })
      .when('/snaps/create', { templateUrl: 'views/snaps/create.html'})
      .when('/feed', { templateUrl: 'views/feed/feed.html'})
      .when('/fans/find', { templateUrl: 'views/fans/fanSearch.html'})
      .when('/places/:snap_id',{ templateUrl: 'views/places/place.html', controller: "PlaceCtrl"})
      .when('/stats/:store_id',{templateUrl: 'views/stats/stats.html'})
      .when('/gifts',{templateUrl: 'views/gifts/gifts.html'})
      .when('/get',{templateUrl:'views/get/get.html'})
      .when('/privacy',{templateUrl:'views/base/privacy.html'})
      .when('/contact',{templateUrl:'views/base/contact.html'})
      .otherwise(       { redirectTo: '/' });

      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://www.google.com/maps/**'
      ]);
      //$locationProvider.html5Mode(true);
      
    }])
.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {

        $rootScope.$on('$routeChangeStart', function (event) {
            var promise = loginService.isLoggedIn();
            promise.then(function(value) {
                if (value===0) {
                  console.log('DENY');
                  //event.preventDefault();


                  // $locationProvider.html5mode(true);
                  //$location.path('/signin');
                  // $locationProvider.html5mode(false);
              }
              else {
                  console.log('ALLOW');
                  //$location.path('/feed');
              }
            },null,null);
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


