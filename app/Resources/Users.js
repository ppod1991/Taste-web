var pg = require('pg');
var Bookshelf = require('bookshelf');

Bookshelf.PG = Bookshelf.initialize({
	client: 'pg',
	connection: {
		host : 'ec2-54-243-48-227.compute-1.amazonaws.com',
		user: 'khctwifcwaratd',
		password: 'D4-FK0pynGsG7S_wuOn4m1Cyrw',
		database: 'd81o6v1corf28q',
		ssl: 'true'
	}
});


//Retrieve all Users
exports.findAll = function(req, res) {
	console.log('Find all Users Called!');
	Bookshelf.PG.knex('users').select().then(function(result) {
	  console.log(result);	     
	  res.send(result);
	});
}

//Retrieve a User by their ID
exports.findById = function(req, res) {
	var user_id = req.params.user_id;
	console.log('Find User By ID Called!');
	Bookshelf.PG.knex('users').select().where('user_id',user_id).then(function(result) {
	  console.log(result[0].first_name);	     
	  res.send(result);
	});
}

//Add a New User 
exports.addUser = function(req, res) {
	console.log("User trying to be added!");
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var gender = req.body.gender;

	Bookshelf.PG.knex('users').insert(
		{first_name: first_name,
		 last_name: last_name,
		 gender: gender})
	.then(function(result) {
		  console.log(result);
	      res.send(201, null);
	});
}

// // //If local db doesn't work, run 'heroku pg:credentials' and replace the address
// var connection = process.env.DATABASE_URL 
// 	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';



// //Connect to the DB (thru Heroku or locally) and execute the passed in database function
// var executeFunction = function(functionToExecute) {
// 	console.log('ExecuteFunction');
// 	pg.connect(connection, function(err, client, done) {
				
// 				var handleError = function(err,client) {
// 				  // no error occurred, continue with the request
// 				  console.log('HandleError');
// 				  if(!err) return false;
// 				  console.log('HandleError2');
// 				  done(client);
// 				  //res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'});
// 				  //res.writeHead(500, {'content-type': 'text/plain'});
// 				  res.end('An error occurred');
// 				  return true;
// 				};

// 				functionToExecute(client);
// 				done();

// 	});
// }

// //Retrieve all Users
// exports.findAll = function(req, res) {
		
// 		var toExecute = function(client) {
// 			console.log('Find All');

// 			client.query('SELECT * FROM users', function(err, result) {
// 			  if(err) return console.error(err);
// 			  console.log(result.rows);
//   		      //res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'PUT, GET, POST, DELETE, OPTIONS'});

// 			  res.send(result.rows);
// 			});

// 		}
// 		executeFunction(toExecute);
// }

// //Retrieve a given user by its ID
// exports.findById = function(req, res) {
// 		var user_id = req.params.user_id;

// 		var toExecute = function(client) {
// 			console.log('Find by Id');

// 			client.query('SELECT * FROM users WHERE user_id =' + user_id.toString() + ';', function(err, result) {
// 			  if(err) return console.error(err);
// 			  console.log(result.rows);
//   		      //res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});
//   		  	  res.send(result.rows);
// 			});

// 		}
// 		executeFunction(toExecute);
// }


//Add A New User
exports.addUser = function(req, res) {
		console.log("User trying to be added!");
		var name = req.body.name;
		var user_id = req.params.user_id;

		var toExecute = function(client) {
			console.log('Add user');

			client.query('INSERT INTO users VALUES (' + user_id.toString() + ",'" + name.toString() + "');" , function(err, result) {
			  if(err) return console.error(err);
			  console.log(result.rows);
  		      res.set({'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS'});
  		  	  res.send(201, null);
			});

		}
		executeFunction(toExecute);
}