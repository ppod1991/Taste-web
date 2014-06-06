    'use strict';
     
    angular.module('fantasyApp.services.firebaseRefs', [])
        .factory('FireRef', ['Firebase',
            function(Firebase) {
                return {
                    users: function() {
                        return new Firebase(FBURL+'/users');
                    }
                    , feed: function() {
                        return new Firebase(FBURL+'/feed');
                    }
                    , snaps: function() {
                        return new Firebase(FBURL+'/snaps');
                    }
                    , friendRequests: function(userID) {
                        //console.log(FBURL+'users/'+userID+'/friendRequests');
                        return new Firebase(FBURL+'users/'+userID+'/friendRequests');
                    }
                }
         }])