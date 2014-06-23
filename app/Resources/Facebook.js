var PG = require('./knex');

exports.newVisitGET = function(req,res) {
	console.log("New Visit GET called!");
	console.log(req.body);
	res.send("{'success'='true'}");
	//var promotion_id = req.body.promotion_id;

	// PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
	// 	console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
	// 	res.send(201, null);
	// });
	

};


exports.newVisitPOST = function(req,res) {
	console.log("New Visit POST called");
	//var promotion_id = req.body.promotion_id;
	console.log(req.body);
	// PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
	// 	console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
	// 	res.send(201, null);
	// });
	
		res.send(201,"{'success'='true'}");

};
