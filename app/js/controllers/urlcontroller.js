'use strict';

angular.module('fantasyApp.controllers.url', [])
  .controller('urlCtrl', ['$scope','$location',
    function($scope, $location) {
    	// var escapedFragment = $routeParams._escaped_fragment_;
    	// console.log("escapedFragment: " + escapedFragment);
    	// if (escapedFragment)
    	// 	console.log("Decoded fragment: " + decodeURI(escapedFragment));
    	console.log("Absolute URL: " + $location.absUrl());
    	var absUrl = $location.absUrl();
    	$location.search( 'status', null );

    	var name = "_escaped_fragment_";
    	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	    var results = regex.exec(absUrl);
	    results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        var newPath = '/';

        if (results) {
            newPath = decodeURIComponent(results[1]);
            console.log("REGEX FOUND FRAGMENT VAL:" + newPath);
        }
	    
	    
	    if (!(results === ""))
	    {
	    	$location.path(newPath);

	    	//$location.url($location.path);
	    }
    	// var escapedFrag = $location.search();
    	// console.log("escapedFragment:");
    	// console.log(escapedFrag);

    }]);
