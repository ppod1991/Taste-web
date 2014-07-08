// web.js

var express = require("express");
var logfmt = require("logfmt");

var pg = require('pg');
var users = require('./app/Resources/Users');
var stores = require('./app/Resources/Stores');
var promotions = require('./app/Resources/Promotions');
var snaps = require('./app/Resources/Snaps');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var request = require('request');
var PG = require('./app/Resources/knex');
var facebook = require('./app/Resources/Facebook');
var url = require('url');

passport.serializeUser(function(user, done) {
  console.log("SERIALIZE USER");
  console.log(user.user_id);
  done(null,user.user_id);
});

passport.deserializeUser(function(user_id, done) {
  console.log("DESERIALIZE USER");
  PG.knex('users').where('user_id',user_id).then(function(user) {
    console.log(user);
    done(null, user[0]); 
  });
});


var callbackURL;


if (!!process.env.PORT) {
	callbackURL = "http://desolate-plateau-4658.herokuapp.com/auth/facebook/callback";
}
else {
	callbackURL = "http://localhost:5000/auth/facebook/callback";
}

passport.use(new FacebookStrategy({
      clientID: 193198737555570,
      clientSecret: "19422735ab599ea41028f4f242e1a6ae",
      callbackURL: callbackURL
    },
  function(accessToken, refreshToken, profile, done) {
    		process.nextTick(function () {
          console.log(profile);
          users.createUser(profile._json,done);
      });
      

  }));

var app = express();


app.use(require('prerender-node').set('prerenderToken', 'Diu6USu9BaTRhnmuaDYJ'));
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

var checkUserAgent = function(req, res, next) {
  //console.log(req);
  var userAgent = req.headers['user-agent'];
  //console.log("REQUEST QUERY PARAMS");
  console.log("URL: " + req.path);
  console.log(url.parse(req.url, true));
  var escapedFrag = req.query._escaped_fragment_;
  console.log("User Agent: " + userAgent);

  var queryString = (req.url).indexOf('?_escaped_fragment_');
  console.log("INDex of query string:  " + queryString);

  if (userAgent === "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)") {
    console.log("DETECTED FACEBOOK!");
    next();
  }
  else if (!(url.parse(req.url, true, true).query.hasOwnProperty('_escaped_fragment_'))) {
    console.log("DETECTED NO ESCAPED FRAGMENT! " + escapedFrag);
    next();
  }
  else {
    console.log("DETECTED ESCAPED FRAGMENT AND NOT FACEBOOK!" + escapedFrag);
    escapedFrag = decodeURI(escapedFrag);
    console.log("AFTER DECODING! " + escapedFrag);
    res.redirect("/#!" + escapedFrag);
  }
};


app.use(checkUserAgent);


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

app.post('/experience',facebook.experienceEatery);

app.get('/android/users', androidAuth, users.findAll);

app.get('/users', users.findAll);
app.get('/users/:user_id', auth, users.findById);
app.post('/users', auth, users.addUser);

app.get('/stores', stores.findAll);
app.get('/stores/:store_id', stores.findById);

//app.get('/promotions/:promotion_id',promotions.findById);
app.get('/promotions', promotions.findAll);
app.post('/promotions',promotions.addPromotion);
app.post('/promotions/redeem',promotions.redeemPromotion);

app.get('/facebookVisit',facebook.newVisitGET);
app.post('/facebookVisit',facebook.newVisitPOST);

app.get('/loggedin',function (req,res) {
  // console.log("Going to /loggedin");
  // console.log(req.user);
  res.send(req.isAuthenticated() ? req.user : {user_id: 0});
});

app.post('/Snaps',snaps.addSnap);

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/callback',passport.authenticate('facebook',{successRedirect:'/#/fans/find',failureRedirect:'/'}),  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req,res) {
	req.logOut();
  res.send(200);
	res.redirect('/');
	
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});


// #!/usr/bin/env node

// var util = require('util'),
//     http = require('http'),
//     fs = require('fs'),
//     url = require('url'),
//     events = require('events');

// var DEFAULT_PORT = 8000;

// // function main(argv) {
// //   new HttpServer({
// //     'GET': createServlet(StaticServlet),
// //     'HEAD': createServlet(StaticServlet)
// //   }).start(Number(argv[2]) || DEFAULT_PORT);
// // }

// function main(argv) {
//   new HttpServer({
//     'GET': createServlet(StaticServlet),
//     'HEAD': createServlet(StaticServlet)
//   }).start(process.env.PORT || DEFAULT_PORT);
// }

// function escapeHtml(value) {
//   return value.toString().
//     replace('<', '&lt;').
//     replace('>', '&gt;').
//     replace('"', '&quot;');
// }

// function createServlet(Class) {
//   var servlet = new Class();
//   return servlet.handleRequest.bind(servlet);
// }

// /**
//  * An Http server implementation that uses a map of methods to decide
//  * action routing.
//  *
//  * @param {Object} Map of method => Handler function
//  */
// function HttpServer(handlers) {
//   this.handlers = handlers;
//   this.server = http.createServer(this.handleRequest_.bind(this));
// }

// HttpServer.prototype.start = function(port) {
//   this.port = port;
//   this.server.listen(port);
//   util.puts('Http Server running at http://localhost:' + port + '/');
// };

// HttpServer.prototype.parseUrl_ = function(urlString) {
//   var parsed = url.parse(urlString);
//   parsed.pathname = url.resolve('/', parsed.pathname);
//   return url.parse(url.format(parsed), true);
// };

// HttpServer.prototype.handleRequest_ = function(req, res) {
//   var logEntry = req.method + ' ' + req.url;
//   if (req.headers['user-agent']) {
//     logEntry += ' ' + req.headers['user-agent'];
//   }
//   util.puts(logEntry);
//   req.url = this.parseUrl_(req.url);
//   var handler = this.handlers[req.method];
//   if (!handler) {
//     res.writeHead(501);
//     res.end();
//   } else {
//     handler.call(this, req, res);
//   }
// };

// /**
//  * Handles static content.
//  */
// function StaticServlet() {}

// StaticServlet.MimeMap = {
//   'txt': 'text/plain',
//   'html': 'text/html',
//   'css': 'text/css',
//   'xml': 'application/xml',
//   'json': 'application/json',
//   'js': 'application/javascript',
//   'jpg': 'image/jpeg',
//   'jpeg': 'image/jpeg',
//   'gif': 'image/gif',
//   'png': 'image/png',
//   'svg': 'image/svg+xml'
// };

// StaticServlet.prototype.handleRequest = function(req, res) {
//   var self = this;
//   var path = ('./' + req.url.pathname).replace('//','/').replace(/%(..)/g, function(match, hex){
//     return String.fromCharCode(parseInt(hex, 16));
//   });
//   var parts = path.split('/');
//   if (parts[parts.length-1].charAt(0) === '.')
//     return self.sendForbidden_(req, res, path);
//   fs.stat(path, function(err, stat) {
//     if (err)
//       return self.sendMissing_(req, res, path);
//     if (stat.isDirectory())
//       return self.sendDirectory_(req, res, path);
//     return self.sendFile_(req, res, path);
//   });
// }

// StaticServlet.prototype.sendError_ = function(req, res, error) {
//   res.writeHead(500, {
//       'Content-Type': 'text/html'
//   });
//   res.write('<!doctype html>\n');
//   res.write('<title>Internal Server Error</title>\n');
//   res.write('<h1>Internal Server Error</h1>');
//   res.write('<pre>' + escapeHtml(util.inspect(error)) + '</pre>');
//   util.puts('500 Internal Server Error');
//   util.puts(util.inspect(error));
// };

// StaticServlet.prototype.sendMissing_ = function(req, res, path) {
//   path = path.substring(1);
//   res.writeHead(404, {
//       'Content-Type': 'text/html'
//   });
//   res.write('<!doctype html>\n');
//   res.write('<title>404 Not Found</title>\n');
//   res.write('<h1>Not Found</h1>');
//   res.write(
//     '<p>The requested URL ' +
//     escapeHtml(path) +
//     ' was not found on this server.</p>'
//   );
//   res.end();
//   util.puts('404 Not Found: ' + path);
// };

// StaticServlet.prototype.sendForbidden_ = function(req, res, path) {
//   path = path.substring(1);
//   res.writeHead(403, {
//       'Content-Type': 'text/html'
//   });
//   res.write('<!doctype html>\n');
//   res.write('<title>403 Forbidden</title>\n');
//   res.write('<h1>Forbidden</h1>');
//   res.write(
//     '<p>You do not have permission to access ' +
//     escapeHtml(path) + ' on this server.</p>'
//   );
//   res.end();
//   util.puts('403 Forbidden: ' + path);
// };

// StaticServlet.prototype.sendRedirect_ = function(req, res, redirectUrl) {
//   res.writeHead(301, {
//       'Content-Type': 'text/html',
//       'Location': redirectUrl
//   });
//   res.write('<!doctype html>\n');
//   res.write('<title>301 Moved Permanently</title>\n');
//   res.write('<h1>Moved Permanently</h1>');
//   res.write(
//     '<p>The document has moved <a href="' +
//     redirectUrl +
//     '">here</a>.</p>'
//   );
//   res.end();
//   util.puts('301 Moved Permanently: ' + redirectUrl);
// };

// StaticServlet.prototype.sendFile_ = function(req, res, path) {
//   var self = this;
//   var file = fs.createReadStream(path);
//   res.writeHead(200, {
//     'Content-Type': StaticServlet.
//       MimeMap[path.split('.').pop()] || 'text/plain'
//   });
//   if (req.method === 'HEAD') {
//     res.end();
//   } else {
//     file.on('data', res.write.bind(res));
//     file.on('close', function() {
//       res.end();
//     });
//     file.on('error', function(error) {
//       self.sendError_(req, res, error);
//     });
//   }
// };

// StaticServlet.prototype.sendDirectory_ = function(req, res, path) {
//   var self = this;
//   if (path.match(/[^\/]$/)) {
//     req.url.pathname += '/';
//     var redirectUrl = url.format(url.parse(url.format(req.url)));
//     return self.sendRedirect_(req, res, redirectUrl);
//   }
//   fs.readdir(path, function(err, files) {
//     if (err)
//       return self.sendError_(req, res, error);

//     if (!files.length)
//       return self.writeDirectoryIndex_(req, res, path, []);

//     var remaining = files.length;
//     files.forEach(function(fileName, index) {
//       fs.stat(path + '/' + fileName, function(err, stat) {
//         if (err)
//           return self.sendError_(req, res, err);
//         if (stat.isDirectory()) {
//           files[index] = fileName + '/';
//         }
//         if (!(--remaining))
//           return self.writeDirectoryIndex_(req, res, path, files);
//       });
//     });
//   });
// };

// StaticServlet.prototype.writeDirectoryIndex_ = function(req, res, path, files) {
//   path = path.substring(1);
//   res.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//   if (req.method === 'HEAD') {
//     res.end();
//     return;
//   }
//   res.write('<!doctype html>\n');
//   res.write('<title>' + escapeHtml(path) + '</title>\n');
//   res.write('<style>\n');
//   res.write('  ol { list-style-type: none; font-size: 1.2em; }\n');
//   res.write('</style>\n');
//   res.write('<h1>Directory: ' + escapeHtml(path) + '</h1>');
//   res.write('<ol>');
//   files.forEach(function(fileName) {
//     if (fileName.charAt(0) !== '.') {
//       res.write('<li><a href="' +
//         escapeHtml(fileName) + '">' +
//         escapeHtml(fileName) + '</a></li>');
//     }
//   });
//   res.write('</ol>');
//   res.end();
// };

// // Must be last,
// main(process.argv);
