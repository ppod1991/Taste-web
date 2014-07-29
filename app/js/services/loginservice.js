'use strict';
 
angular.module('fantasyApp.services.login', ['ngResource'])
    .factory('loginService', ['$resource','$q',
        function($resource, $q) {
        	var user_id = 0;
            var user_name = 'My';
        	return {

        		getName: function () {
                    console.log("Returning name of " + user_name);
                    return user_name;
                },

        		getUser: function() {
        			//console.log("Get User Called with value: " + user_id );
        			return user_id;
        		},

        		isLoggedIn: function() {
		            //return $resource("http://www.getTaste.co/users/:user_id",{user_id:'@user_id'});            
			        var deferred = $q.defer();
                    //console.log("Promise deferred");
                    var checkLogIn = $resource("/loggedin").get(function () {
                        console.log("Check Log IN Returned User:");
                        console.log(checkLogIn);
						user_id = checkLogIn.user_id;
                        user_name = checkLogIn.first_name + "'s";
					    //console.log("isLoggedIn called and user_id set to:  " + user_id);
						var isLoggedIn = !(checkLogIn.user_id === 0);  
			        	//console.log((checkLogIn.user_id));
			        	//console.log('Response is ' + isLoggedIn);
                        //console.log("Promise resolved with user_id: " + user_id);
                        deferred.resolve(user_id);

			        	
			        });
                    return deferred.promise;
			        
        		}
        	}
        }]);


// 'use strict';

// /* Services */

// angular.module('fantasyApp.services.login', ['fantasyApp.services.profileCreator'])
//   .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope','FireRef',
//     function(angularFireAuth, profileCreator, $location, $rootScope,FireRef) {
//       return {
//         login: function(redirect, callback) {

//           var p = angularFireAuth.login('facebook', {
//             rememberMe: true
//           });

//           p.then(function(user) {

//             var potentialUserRef = FireRef.users().child(user.id);
//             console.log('TESTING1');
//             console.log(potentialUserRef);
//             potentialUserRef.once('value', function(snapshot) {
//               console.log('TESTING2');
//               console.log(user);
//               var valAtReference = snapshot.val();
//               console.log('Value at Reference: ');
//               console.log(valAtReference);
//               if(valAtReference === null || valAtReference.id !== user.id) {
//                 console.log('User does not yet exist. Creating now!');
//                 profileCreator(user.id,user.displayName,user.email);
//               }
//             });

//             if( redirect ) {
//               $location.path(redirect);
//             }
//           }, callback);
//         },
//         logout: function() {
//           angularFireAuth.logout();

//         },
//         // createAccount: function(name, email, pass, callback) {
//         //   angularFireAuth._authClient.createUser(email, pass, function(err, user) {
//         //     if(callback) {
//         //       callback(err, user);
//         //       $rootScope.$apply();
//         //     }
//         //   });
//         // },
//         createProfile: profileCreator
//       }
//     }])



// 'use strict';

// /* Services */

// angular.module('fantasyApp.services.login', ['fantasyApp.services.profileCreator'])
//   .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope','FireRef',
//     function(angularFireAuth, profileCreator, $location, $rootScope,FireRef) {
//       return {
//         login: function(redirect, callback) {

//           var p = angularFireAuth.login('facebook', {
//             rememberMe: true
//           });

//           p.then(function(user) {

//             var potentialUserRef = FireRef.users().child(user.id);
//             console.log('TESTING1');
//             console.log(potentialUserRef);
//             potentialUserRef.once('value', function(snapshot) {
//               console.log('TESTING2');
//               console.log(user);
//               var valAtReference = snapshot.val();
//               console.log('Value at Reference: ');
//               console.log(valAtReference);
//               if(valAtReference === null || valAtReference.id !== user.id) {
//                 console.log('User does not yet exist. Creating now!');
//                 profileCreator(user.id,user.displayName,user.email);
//               }
//             });

//             if( redirect ) {
//               $location.path(redirect);
//             }
//           }, callback);
//         },
//         logout: function() {
//           angularFireAuth.logout();

//         },
//         // createAccount: function(name, email, pass, callback) {
//         //   angularFireAuth._authClient.createUser(email, pass, function(err, user) {
//         //     if(callback) {
//         //       callback(err, user);
//         //       $rootScope.$apply();
//         //     }
//         //   });
//         // },
//         createProfile: profileCreator
//       }
//     }])
