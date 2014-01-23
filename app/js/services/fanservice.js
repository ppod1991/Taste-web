'use strict';
 
angular.module('fantasyApp.services.fans', ['fantasyApp.services.firebaseRefs'])
    .factory('Fans', ['FBURL', 'Firebase', 'angularFireCollection', 'FireRef',
        function(FBURL, Firebase, angularFireCollection, FireRef) {
            return {
                collection: function() {
                    return angularFireCollection(FireRef.users());
                }
                , create: function(user,friend) {
                    //console.log(friend);
                    //console.log(user);    
                    FireRef.users().child(user).child('friends').child(friend.$id).set(friend.$id);
                }
            }   
        }])