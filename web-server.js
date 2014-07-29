// web.js

var express = require("express");
var logfmt = require("logfmt");

var pg = require('pg');
var users = require('./app/Resources/Users');
var stores = require('./app/Resources/Stores');
var promotions = require('./app/Resources/Promotions');
var snaps = require('./app/Resources/Snaps');
var stats = require('./app/Resources/Stats');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var request = require('request');
var PG = require('./app/Resources/knex');
//var facebook = require('./app/Resources/Facebook');
var url = require('url');
var jade = require('jade');

passport.serializeUser(function(user, done) {
  //console.log("SERIALIZE USER");
  //console.log(user.user_id);
  done(null,user.user_id);
});

passport.deserializeUser(function(user_id, done) {
  //console.log("DESERIALIZE USER");
  PG.knex('users').where('user_id',user_id).then(function(user) {
    //console.log(user);
    done(null, user[0]); 
  });
});


var callbackURL;


if (!!process.env.PORT) {
	callbackURL = "http://www.getTaste.co/auth/facebook/callback";
}
else {
	callbackURL = "http://localhost:5000/auth/facebook/callback";
}

passport.use(new FacebookStrategy({
      clientID: 193198737555570,
      clientSecret: "19422735ab599ea41028f4f242e1a6ae",
      //callbackURL: callbackURL
    },
  function(accessToken, refreshToken, profile, done) {
    		process.nextTick(function () {
          console.log(profile);
          users.createUser(profile._json,done);
      });
      

  }));

var app = express();


//app.use(require('prerender-node').set('prerenderServiceUrl', 'http://intense-eyrie-3358.herokuapp.com/'));
app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/app'));
app.use(cors());



// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5000/");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Ace")
//   next();
//  });

var androidAuth = function(req, res, next) {
	var clientAccessToken = req.query.accessToken;
  request.get(('https://graph.facebook.com/v2.0/debug_token?input_token='+clientAccessToken +'&access_token=193198737555570|19422735ab599ea41028f4f242e1a6ae'), function (error, response, body) {
    console.log("Response from Facebook:");

    if (error) {
      console.log("Error");
      console.log(error);
      res.send(401);
    }
    else {
      var returnedObject = JSON.parse(body);
      console.log(JSON.stringify(returnedObject));
      if ("error" in returnedObject || "error" in returnedObject.data || !returnedObject.data.is_valid)
        res.send(401);
      else
        next();
    }
    
  });

};

var auth = function(req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

// var checkUserAgent = function(req, res, next) {
//   //console.log(req);
//   var userAgent = req.headers['user-agent'];
//   //console.log("REQUEST QUERY PARAMS");
//   console.log("URL: " + req.path);
//   console.log(url.parse(req.url, true));
//   var escapedFrag = req.query._escaped_fragment_;
//   console.log("User Agent: " + userAgent);

//   var queryString = (req.url).indexOf('?_escaped_fragment_');
//   console.log("INDex of query string:  " + queryString);

//   if (userAgent === "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)") {
//     console.log("DETECTED FACEBOOK!");
//     next();
//   }
//   else if (!(url.parse(req.url, true, true).query.hasOwnProperty('_escaped_fragment_'))) {
//     console.log("DETECTED NO ESCAPED FRAGMENT! " + escapedFrag);
//     next();
//   }
//   else {
//     console.log("DETECTED ESCAPED FRAGMENT AND NOT FACEBOOK!" + escapedFrag);
//     escapedFrag = decodeURI(escapedFrag);
//     console.log("AFTER DECODING! " + escapedFrag);
//     res.redirect("/#!" + escapedFrag);
//   }
// };


// app.use(checkUserAgent);
app.get('/get',function(req,res){
  res.redirect(301,'https://play.google.com/store/apps/details?id=com.pod.taste&ah=3m5KCLR5t3wwfmz7Iye4wPgKuIg');
});

app.get('/moltoBene', function(req, res) {
  res.sendfile('./app/views/places/moltoBene.html');
});

app.get('/eastAsianFusion', function(req, res) {
  res.sendfile('./app/views/places/eastAsianFusion.html');
});

app.get('/crownOfIndia', function(req, res) {
  res.sendfile('./app/views/places/crownOfIndia.html');
});

app.get('/', function(req, res) {
  res.sendfile('index.html');
});


app.get('/places/:snapID', function(req,res) {
  var userAgent = req.headers['user-agent'];
  console.log("User Agent: " + userAgent);
  var snapID = req.params.snapID;

  //If user-agent is facebookexternalhit, the render page in JADE for Open Graph meta tags
  if(userAgent.toLowerCase().indexOf('facebookexternalhit') !== -1) {
    console.log("FACEBOOK EXTERNAL HIT DETECTED!!");
    console.log("Snap ID " + snapID);
    snaps.getMetaInfo(snapID, function(locals) {
      console.log("Locals " + JSON.stringify(locals));
      var html = jade.renderFile('./app/placeTemplate.jade',{pretty:true,locals:locals});
      res.send(201,html);
    });
  }
  else {
    console.log("REDIRECT CALLED!!");
    res.redirect('/#!/places/' + snapID );
  }
  //Else, redirection '/#!/places/:snapID'
  // else {
  //   res.redirect('/#!/places/' + snapID );
  // }



  

});


app.get('/stats/:store_id', stats.getStoreStats);

//app.post('/experience',facebook.experienceEatery);

app.get('/android/users', androidAuth, users.findAll);

app.get('/users', users.findAll);
app.get('/users/:user_id', auth, users.findById);
app.post('/users', auth, users.addUser);
app.post('/users/android',users.addAndroidUser);

app.get('/stores', stores.findAll);
app.get('/stores/:store_id', stores.findById);

//app.get('/promotions/:promotion_id',promotions.findById);
app.get('/promotions', promotions.findAll);
app.get('/promotions/isFirstPromotion',promotions.isFirstPromotion);
app.post('/promotions',promotions.addPromotion);
app.post('/promotions/redeem',promotions.redeemPromotion);

// app.get('/facebookVisit',facebook.newVisitGET);
// app.post('/facebookVisit',facebook.newVisitPOST);

app.get('/loggedin',function (req,res) {
  // console.log("Going to /loggedin");
  // console.log(req.user);
  res.send(req.isAuthenticated() ? req.user : {user_id: 0});
});

app.post('/snaps',snaps.addSnap);
app.get('/snaps/:snap_id', snaps.findById);

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/places/:snapID', function(req, res, next){
   passport.authenticate('facebook',{callbackURL: '/auth/facebook/callback/places/'+req.params.snapID})(req,res,next);
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/q', function(req, res, next){
  console.log("INitial callbackL");
  console.log('/auth/facebook/callback/q?location='+encodeURIComponent(req.query.location));
  passport.authenticate('facebook',{callbackURL: '/auth/facebook/callback/q?location='+encodeURIComponent(req.query.location)})(req,res,next);
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

// app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){
//     // The request will be redirected to Facebook for authentication, so this
//     // function will not be called.
//   });

app.get('/auth/facebook/callback',passport.authenticate('facebook'), function(req, res) {
    console.log("FACEBOOK REDIRECT REQUEST!!");
    console.log(req);
    console.log("FACEBOOK REDIRECT REQUEST 2!!");
    res.redirect('/');
  });

app.get('/auth/facebook/callback/places/:snapID', function(req, res,next) {
    passport.authenticate(
      'facebook',
      {
        callbackURL: '/auth/facebook/callback/places/'+req.params.snapID,
        successRedirect:"/#!/places/" + req.params.snapID,
        failureRedirect: "/"
      })(req,res,next);
  });

app.get('/auth/facebook/callback/q', function(req, res,next) {
  console.log("Second callbackL");
  console.log('/auth/facebook/callback/q?location='+encodeURIComponent(req.query.location));
    passport.authenticate(
      'facebook',
      {
        callbackURL: '/auth/facebook/callback/q?location='+encodeURIComponent(req.query.location),
        successRedirect: "/#!" + (req.query.location),
        failureRedirect: "/"
      })(req,res,next);
  });


app.get('/logout', function(req,res) {
	req.logOut();
  res.send(200);
	res.redirect('/');
	
});

app.get('/logout/q', function(req,res) {
  req.logOut();
  res.send(200);
  res.redirect('/#!' + req.query.location);
  
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});



