
'use strict';

/* Services */

angular.module('fantasyApp.services.login', ['fantasyApp.services.profileCreator'])
  .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope','FireRef',
    function(angularFireAuth, profileCreator, $location, $rootScope,FireRef) {
      return {
        login: function(email, pass, redirect, callback) {
          var p = angularFireAuth.login('facebook', {
            rememberMe: true,
            scope: 'email'
          });
          p.then(function(user) {
            var potentialUserRef = FireRef.fantasyTeams().child('users/'+ user.id);
            potentialUserRef.on('value', function(snapshot) {
              if(snapshot.val() === null) {
                alert('User does not yet exist. Creating now!');
                profileCreator(user.id,user.displayName,user.email);
              }
            });
            // julieRef.on('value', function(snapshot) {
            //   if(snapshot.val() === null) {
            //     alert('User julie does not exist.');
            //   } else {
            //     var firstName = snapshot.val().name.first;
            //     var lastName = snapshot.val().name.last;
            //     alert('User julie’s full name is: ' + firstName + ' ' + lastName);
            //   }
            // });

            if( redirect ) {
              $location.path(redirect);
            }
            callback && callback(null, user);
          }, callback);
        },
        logout: function(redirectPath) {
          angularFireAuth.logout();
          if(redirectPath) {
            $location.path(redirectPath);
          }
        },
        createAccount: function(name, email, pass, callback) {
          angularFireAuth._authClient.createUser(email, pass, function(err, user) {
            if(callback) {
              callback(err, user);
              $rootScope.$apply();
            }
          });
        },
        createProfile: profileCreator
      }
    }])
