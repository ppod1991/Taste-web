var pg = require('pg');
var bookshelf = require('./Bookshelf');



//Retrieve all Promotions where Query Parameters are met
exports.findAll = function(req, res) {
	console.log('Find all Promotions In Existence!');
	var store_id = req.query.store_id;
	var user_id = req.query.user_id;
	var use_status = req.query.use_status;

	var model = bookshelf.PG.knex('promotions').select();
	if("store_id" in req.query) {
		model = model.where('store_id',store_id);
	}

	if("user_id" in req.query) {
		model = model.where('user_id',user_id);
	}

	if("use_status" in req.query) {
		model = model.where('use_status',use_status);
	}
	model.then(function(result) {
	  console.log(result);	     
	  res.send("{Promotions: " + JSON.stringify(result) + "}");
	});
};

//Retrieve a User by their ID
exports.findById = function(req, res) {


	console.log('Find Promitions By ID Called!');
	bookshelf.PG.knex('promotions').select().where('promotion_id',promoition_id).then(function(result) {
	  console.log(result[0].display_text);	     
	  res.send(result);
	});
};

// // //If local db doesn't work, run 'heroku pg:credentials' and replace the address
// var connection = process.env.DATABASE_URL 
// 	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';

