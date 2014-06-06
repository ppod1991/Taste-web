'use strict';
 
angular.module('fantasyApp.services.fans', ['fantasyApp.services.firebaseRefs'])
    .factory('Fans', ['Firebase', 'angularFireCollection', 'FireRef',
        function(Firebase, angularFireCollection, FireRef) {
            return {
                collection: function() {
                    return angularFireCollection(FireRef.users());
                }
                , friendRequest: function(userID,friend) {
                    // console.log(friend);
                    // console.log(userID);    

                    FireRef.users().child(userID).child('sentFriendRequests').child(friend.$id).set({
                        toID: friend.$id,
                        fromID: userID,
                        date: new Date().getTime()
                    });

                    FireRef.users().child(friend.$id).child('receivedFriendRequests').child(userID).set({
                        toID: friend.$id,
                        fromID: userID,
                        date: new Date().getTime()
                    });


                }
            }   
        }])