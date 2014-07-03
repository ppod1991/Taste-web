//var pg = require('pg');
var PG = require('./knex');



//Retrieve all Stores
exports.findAll = function(req, res) {
	console.log('Find all Stores Called!');
	PG.knex('stores').select().then(function(result) {
	  console.log(result);	     
	  res.send("{Stores: " + JSON.stringify(result) + "}");
	});
};

//Retrieve a User by their ID
exports.findById = function(req, res) {
	var store_id = req.params.store_id;
	console.log('Find Store By ID Called!');
	PG.knex('stores').select().where('store_id',store_id).then(function(result) {
	  //console.log(result[0].first_name);	     
	  res.send(result[0]);
	});
};

// // //If local db doesn't work, run 'heroku pg:credentials' and replace the address
// var connection = process.env.DATABASE_URL 
// 	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';

