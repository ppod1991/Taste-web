var PG = require('./knex');



//Retrieve all Promotions where Query Parameters are met
exports.findAll = function(req, res) {
	//console.log("pg");
	//console.log(PG);
	console.log('Find all Promotions In Existence!');
	var store_id = req.query.store_id;
	var user_id = req.query.user_id;
	var use_status = req.query.use_status;
	var model = PG.knex('promotions').innerJoin('stores','promotions.store_id', 'stores.store_id')
				.select('display_text','store_name','start_date','end_date','promotion_id');
	//console.log(knex('promotions').join('stores'));
	//var model = PG.knex('promotions').innerJoin('stores');
	//console.log(model.toString());
	//('stores','promotions.store_id','stores.store_id').select();
	if("store_id" in req.query) {
		model = model.where('promotions.store_id',store_id);
	}

	if("user_id" in req.query) {
		model = model.where('user_id',user_id);
	}

	if("use_status" in req.query) {
		model = model.where('use_status',use_status);
	}
	model = model.where(PG.knex.raw("end_date > timezone('utc'::text, now())"));

	console.log(model.toString());
	//model = model.where(PG.knex.raw("start_date < timezone('utc'::text, now())"));
	//console.log("REACHED");
	model.then(function(result) {
	  console.log(result);	     
	  res.send("{Promotions: " + JSON.stringify(result) + "}");
	});
};

exports.isFirstPromotion = function (req,res) {
	var user_id = req.query.user_id;
	var store_id = req.query.store_id;
	PG.knex('promotions').where('user_id',user_id).where('store_id',store_id).count('promotion_id').then(function(result) {
			console.log("isFirstPromotion called with result: ");
			console.log(result);

			var count = parseInt(result[0].count);
			res.send(count === 0);
		});
	
};

exports.addPromotion = function(req,res) {
	console.log("Promotion trying to be added!");
	var user_id = req.body.user_id;
	var store_id = req.body.store_id;
	var display_text;
	var first_time = req.body.first_time;
	var count = -1;

	if ("first_time" in req.body && first_time) {
		console.log("First Time Found!");
		PG.knex('promotions').where('user_id',user_id).where('store_id',store_id).count('promotion_id').then(function(result) {
			console.log(result);
			count = parseInt(result[0].count);
			console.log("Count: " + count);
			if (count === 0) {
				console.log("Count is === 0");

				if("display_text" in req.body) {
					display_text = req.body.display_text;
				}
				else {
					display_text = "$2 Gift Certificate!";
				}
				


				PG.knex('promotions').insert(
					{user_id: user_id,
					 store_id: store_id,
					 display_text: display_text})
				.returning('promotion_id')
				.then(function(result) {
					  console.log('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
				      res.send('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
				});


			 }
			else {
				console.log("Sorry, you have already claimed a promotion from here " + count + " times!");
				res.send("Sorry, you have already claimed a promotion from here " + count + " times!");
			}	

		});
			
	}
	else {


		if("display_text" in req.body) {
			display_text = req.body.display_text;
		}
		else {
			display_text = "$2 Gift Certificate!";
		}
		


		PG.knex('promotions').insert(
			{user_id: user_id,
			 store_id: store_id,
			 display_text: display_text})
		.returning('promotion_id')
		.then(function(result) {
			  console.log('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
		      res.send('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
		});
	}
};

exports.redeemPromotion = function(req,res) {
	console.log("Promotion trying to be redeemed!");
	var promotion_id = req.body.promotion_id;

	PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
		console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
		res.send(201, null);
	});


};

//Retrieve a User by their ID
exports.findById = function(req, res) {


	console.log('Find Promotions By ID Called!');
	PG.knex('promotions').select().where('promotion_id',promotion_id).then(function(result) {
	  console.log(result[0].display_text);	     
	  res.send(result);
	});
};

// // //If local db doesn't work, run 'heroku pg:credentials' and replace the address
// var connection = process.env.DATABASE_URL 
// 	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';

