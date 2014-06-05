'use strict';

angular.module('fantasyApp.controllers.signin', ['fantasyApp.services.login'])
  .controller('SigninCtrl', ['$scope', 'loginService',
    function($scope, loginService) {
      $scope.login = function(callback) {     
        loginService.get(function(response) {
            console.log(response);
            $scope.auth = response;
          });
        };
    }])



// 'use strict';

// angular.module('fantasyApp.controllers.signin', ['fantasyApp.services.login'])
//   .controller('SigninCtrl', ['$scope', 'loginService', '$location',
//     function($scope, loginService, $location) {

//       if (!!$scope.auth) {
//         $location.path('/feed');
//       }
      
//       $scope.$on('angularFireAuth:login', function () {
//         $location.path('/feed');
//       })

//       $scope.email = null;
//       $scope.pass = null;
//       $scope.name = null;

//       $scope.login = function(callback) {
//         $scope.err = null;
//         loginService.login('/feed', function(err, user) {
//           $scope.err = err||null;
//           typeof(callback) === 'function' && callback(err, user);
//         });
//       };
//     }])
  