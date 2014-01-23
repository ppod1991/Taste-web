'use strict';
 
angular.module('fantasyApp.services.feed', ['fantasyApp.services.firebaseRefs'])
    .factory('Feed', ['angularFireCollection', 'FireRef',
        function(angularFireCollection, FireRef) {
            return {
                collection: function(cb) {
                    return angularFireCollection(FireRef.feed(),cb);
                }
            }      
        }])