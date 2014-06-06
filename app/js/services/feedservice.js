'use strict';
 
angular.module('fantasyApp.services.feed', ['fantasyApp.services.firebaseRefs'])
    .factory('Feed', ['angularFireCollection', 'FireRef', 
        function(angularFireCollection, FireRef) {
            return {
                collection: function(auth, cb) {
                    //console.log(auth);
                    //console.log(FireRef);
                    //return angularFireCollection(FireRef.friendRequests(auth.id),cb);

                    // return angularFireCollection(FireRef.feed(),cb);
                }
            }      
        }])