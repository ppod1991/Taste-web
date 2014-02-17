'use strict';

angular.module('fantasyApp.services.profileCreator', [])
  .factory('profileCreator', ['$rootScope','FireRef', 
    function($rootScope,FireRef) {
    return function(myID, name, email, callback) {
      console.log('Setting '  + name + ' with ID of ' + myID);
      FireRef.users().child(myID).set({email: email, name: name, id: myID}, function(err) {
        if(callback) {
          callback(err);
          $rootScope.$apply();
        }
      });
    }
  }]);