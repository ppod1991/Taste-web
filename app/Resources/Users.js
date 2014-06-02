var pg = require('pg');

//If local db doesn't work, run 'heroku pg:credentials' and replace the address
var connection = process.env.DATABASE_URL 
	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';



//Connect to the DB (thru Heroku or locally) and execute the passed in database function
var executeFunction = function(functionToExecute) {
	console.log('ExecuteFunction');
	pg.connect(connection, function(err, client, done) {
				
				var handleError = function(err,client) {
				  // no error occurred, continue with the request
				  console.log('HandleError');
				  if(!err) return false;
				  console.log('HandleError2');
				  done(client);
				  res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});
				  //res.writeHead(500, {'content-type': 'text/plain'});
				  res.end('An error occurred');
				  return true;
				};

				functionToExecute(client);
				done();

	});
}

//Retrieve all Users
exports.findAll = function(req, res) {
		
		var toExecute = function(client) {
			console.log('Find All');

			client.query('SELECT * FROM users', function(err, result) {
			  if(err) return console.error(err);
			  console.log(result.rows);
  		      res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});

			  res.send(result.rows);
			});

		}
		executeFunction(toExecute);
}

//Retrieve a given user by its ID
exports.findById = function(req, res) {
		var user_id = req.params.user_id;

		var toExecute = function(client) {
			console.log('Find by Id');

			client.query('SELECT * FROM users WHERE user_id =' + user_id.toString() + ';', function(err, result) {
			  if(err) return console.error(err);
			  console.log(result.rows);
  		      res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});
  		  	  res.send(result.rows);
			});

		}
		executeFunction(toExecute);
}


//Add A New User
exports.addUser = function(req, res) {
		var name = req.body.name;
		var user_id = req.params.user_id;

		var toExecute = function(client) {
			console.log('Add user');

			client.query('INSERT INTO users VALUE (' + user_id.toString() + ",'" + name.toString() + "');" , function(err, result) {
			  if(err) return console.error(err);
			  console.log(result.rows);
  		      res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});
  		  	  res.send(result.rows);
			});

		}
		executeFunction(toExecute);
}