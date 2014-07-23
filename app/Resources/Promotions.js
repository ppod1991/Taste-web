var PG = require('./knex');



//Retrieve all Promotions where Query Parameters are met
exports.findAll = function(req, res) {
	//console.log("pg");
	//console.log(PG);
	console.log('Find all Promotions In Existence!');
	var store_id = req.query.store_id;
	var user_id = req.query.user_id;
	var use_status = req.query.use_status;
	var model = PG.knex('promotions').orderBy('end_date','asc').innerJoin('stores','promotions.store_id', 'stores.store_id')
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
	  console.log('{"Promotions": ' + JSON.stringify(result) + '}');	     
	  res.send('{"Promotions": ' + JSON.stringify(result) + '}');
	});
};

exports.isFirstPromotion = function (req,res) {
	var user_id = req.query.user_id;
	var snap_id = req.query.snap_id;

	PG.knex('snaps').where('snap_id',snap_id).select('store_id').then(function(result) {
		var store_id = result[0].store_id;
		PG.knex('promotions').where('user_id',user_id).where('store_id',store_id).count('promotion_id').then(function(result) {
				console.log("isFirstPromotion called with result: ");
				console.log(result);

				var count = parseInt(result[0].count);
				res.send({isFirstPromotion: (count === 0)});
			});
	});
	
	
};



exports.redeemPromotion = function(req,res) {
	console.log("Promotion trying to be redeemed!");
	var promotion_id = req.body.promotion_id;
	var start_date = new Date(req.body.start_date);
	var end_date = new Date(req.body.end_date);
	var cur_date = new Date();

	if (cur_date > end_date) {
		//Promotion Expired 
		console.log("Trying to Redeem Expired Coupon");
		res.send(201,{success: false, response_message:'eek! This gift has expired! :('});
		return;
	}

	if (cur_date < start_date) {
		//Promotion Expired 
		console.log('Trying to Redeem Coupon Too Early');
		res.send(201,{success: false, response_message:'alas! This gift is not ready yet, but try again soon!'});
		return;

	}
	PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
		console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
		res.send(201, {success: true, response_message:'You just redeemed your gift! I am jealous...'});
		return;
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

exports.addPromotion = function(req,res) {
	console.log("Promotion trying to be added!");
	var user_id = req.body.user_id;
	var store_id = req.body.store_id;
	var display_text;
	var referring_user_id = -1;
	if("display_text" in req.body) {
		display_text = req.body.display_text;
	}
	else {
		display_text = "$2 Gift for each person in your party!";
	}
	
	if("referring_user_id" in req.body) {
		referring_user_id = req.body.referring_user_id;
	}
	else {
		referring_user_id = -1;
	}

	// var first_time = req.body.first_time;
	// var count = -1;

	// if ("first_time" in req.body && first_time) {
	// 	console.log("First Time Found!");
		// PG.knex('promotions').where('user_id',user_id).where('store_id',store_id).count('promotion_id').then(function(result) {
		// 	console.log(result);
		// 	count = parseInt(result[0].count);
	// 		console.log("Count: " + count);
	// 		if (count === 0) {
	// 			console.log("Count is === 0");

	// 			if("display_text" in req.body) {
	// 				display_text = req.body.display_text;
	// 			}
	// 			else {
	// 				display_text = "$2 Gift!";
	// 			}
				


	// 			PG.knex('promotions').insert(
	// 				{user_id: user_id,
	// 				 store_id: store_id,
	// 				 display_text: display_text})
	// 			.returning('promotion_id')
	// 			.then(function(result) {
	// 				  console.log('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
	// 			      res.send('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
	// 			});


	// 		 }
	// 		else {
	// 			console.log("Sorry, you have already claimed a promotion from here " + count + " times!");
	// 			res.send("Sorry, you have already claimed a promotion from here " + count + " times!");
	// 		}	

	// 	});
			
	// }

	if (referring_user_id > 0) {
		var start_date = new Date();
		//start_date.setHours(23,59,59,0);  //Set to 11:59:59pm  tonight
		start_date = start_date.toISOString();
		var end_date = new Date(+ new Date() + 12096e5); //Two weeks from now
		end_date.setHours(0,0,1,0);
		end_date = end_date.toISOString();

		console.log("Referring User ID > 0");
		PG.knex('promotions').where('user_id',user_id).where('store_id',store_id).where(PG.knex.raw("end_date > timezone('utc'::text, now())")).where('use_status','not used').count('promotion_id').then(function(result) {
			console.log(result);
			var count = parseInt(result[0].count);
			console.log("This user has " + count + " valid promotions!");
			if (count < 2) {
				PG.knex('promotions').insert(
					{user_id: user_id,
					 store_id: store_id,
					 display_text: display_text,
					 referring_user_id: referring_user_id,
					 start_date: start_date,
					 end_date: end_date})
				.returning('promotion_id')
				.then(function(result) {
					  //console.log('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
				      //res.send('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
					  console.log("Successfully added the user-referred promotion");
					  res.send(201,{promotion_added:true,reason:null});
				});
			}
			else {
				res.send(201,{promotion_added:false,reason:"You already have too many gifts from here. Sharing is caring."});
			}
		});
	}
	else {
		var start_date = new Date();
		start_date.setHours(23,59,59,0);  //Set to 11:59:59pm  tonight
		start_date = start_date.toISOString();
		var end_date = new Date(+ new Date() + 4*12096e5); //Two weeks from now
		end_date.setHours(0,0,1,0);
		end_date = end_date.toISOString();

		PG.knex('promotions').insert(
			{user_id: user_id,
			 store_id: store_id,
			 display_text: display_text})
		.returning('promotion_id')
		.then(function(result) {
			  console.log("Successfully added the store-referred promotion");
			  //console.log('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
		      //res.send('{"user_id":"' + user_id + '","store_id":"' + store_id + '","display_text":"' + display_text + '","promotion_id":"' + result[0] + '"}');
			  res.send(201,{promotion_added:true,reason:null});
		});
	}

	
	
};