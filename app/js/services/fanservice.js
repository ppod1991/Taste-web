'use strict';
 
angular.module('fantasyApp.services.fans', ['fantasyApp.services.firebaseRefs'])
    .factory('Fans', ['FBURL', 'Firebase', 'angularFireCollection', 'FireRef',
        function(FBURL, Firebase, angularFireCollection, FireRef) {
            return {
                collection: function() {
                    return angularFireCollection(FireRef.users());
                }
                , friendRequest: function(user,friend) {
                    //console.log(friend);
                    //console.log(user);    
                    FireRef.users().child(user).child('friendRequests').push({
                        ID: friend.$id,
                        date: new Date().getTime()
                    });

                }
            }   
        }])