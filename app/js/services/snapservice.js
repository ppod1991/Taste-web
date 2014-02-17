'use strict';
 
angular.module('fantasyApp.services.snaps', ['fantasyApp.services.firebaseRefs'])
    .factory('Snaps', ['angularFireCollection', 'FireRef',
        function(angularFireCollection, FireRef) {
            return {
                create: function(store, clothing, id, cb) {
                return FireRef.snaps().push({
                    store: store,
                    clothing: clothing,
                    date: new Date().getTime(),
                    userID: id
                }, cb).name();
                }
            }      
        }])