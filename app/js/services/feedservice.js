'use strict';
 
angular.module('fantasyApp.services.feed', ['fantasyApp.services.firebaseRefs'])
    .factory('Feed', ['angularFireCollection', 'FireRef', 
        function(angularFireCollection, FireRef) {
            return {
                collection: function(user, cb) {
                    //console.log(user);
                    //console.log(FireRef);
                    return angularFireCollection(FireRef.friendRequests(user.id),cb);

                    // return angularFireCollection(FireRef.feed(),cb);
                }
            }      
        }])