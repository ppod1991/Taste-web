var PG = require('./knex');
var request = require('request');

exports.addSnap = function (req, res) {
	console.log("Snap trying to be added!");
	//console.log(req);
	var referral_expiration_date = new Date();
	referral_expiration_date.setDate(referral_expiration_date.getDate()+3);

	//Insert snap, then post OG story to FB, then take action ID and insert back into snap_id
	PG.knex('snaps').insert(
		{user_id: req.body.user.user_id,
		 store_id: req.body.store.store_id,
		 received_promotion_id: req.body.promotion.promotion_id,
		 snap_message: req.body.snap_message,
		 snap_URL: req.body.picture_url,
		 facebook_image_post_id: req.body.facebook_post_id,
		 referral_expiration_date: referral_expiration_date.toISOString()
		 }).returning('snap_id')
	.then(function(result) {
		var snap_id = result[0];
		console.log("Snap ID: " + snap_id);

	  	var access_token = req.body.access_token;
	  	var eatery = 'https://desolate-plateau-4658.herokuapp.com/places/' + snap_id;
	  	eatery = '&eatery=' + encodeURIComponent(eatery);
	  	console.log("Encoded Eatery:" + eatery);
	  	var picture_url = req.body.picture_url;
	  	var place = '&place=' + encodeURIComponent('https://desolate-plateau-4658.herokuapp.com/places/' + snap_id);
	  	var baseURL = 'https://graph.facebook.com/me/tasteapplication:experience';
	  	var method = '&method=POST';
	  	var pictureURLforFB =  '&image[0][url]=' + encodeURIComponent(picture_url) + '&image[0][user_generated]=true';
	  	//var pictureURL =  '&image:url=' + encodeURIComponent('https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/10499434_10152165511185233_8074458132375143692_o.jpg') + '&image:user_generated=true';
	  	var explicitSharing = '&fb:explicitly_shared=true';
	  	var scrape = '&scrape=false';
	  	var messageForFB = '&message=' + encodeURIComponent(req.body.snap_message);
	  	var resultingURL = baseURL + '?access_token=' + access_token + method + eatery + place + pictureURLforFB + explicitSharing + scrape + messageForFB;
	  	console.log("resulting url: " + resultingURL);
	  	
	  	request.post({url: resultingURL},function (error, response,body) {
	  			console.log("Error: " + error);
	  			console.log("Response: " + response);
	  			console.log("Body: " + body);
	  			var facebook_action_post_id = JSON.parse(body).id;
	  			console.log('Facebook Action Post Id: ' + facebook_action_post_id);
	  			PG.knex('snaps').where('snap_id',snap_id).update({facebook_action_post_id: facebook_action_post_id, fb_post_request_url:resultingURL})
	  				.then(function(result) {
	  					console.log("Result of adding action post ID");
	  					console.log(result);
	  					res.send(201,null);
	  				});
	  		});
	});

};


//Retrieve a Snap by its ID
exports.findById = function(req, res) {
	var snap_id = req.params.snap_id;
	console.log('Find Snap By ID Called!');
	PG.knex('snaps').innerJoin('stores','snaps.store_id', 'stores.store_id').innerJoin('users','snaps.user_id','users.user_id').select().where('snap_id',snap_id).then(function(result) {
	  //console.log(result[0].first_name);	     
	  res.send(result[0]);
	});
};

//Retrieve a Snap by its ID
exports.getMetaInfo = function(snap_id,cb) {
	console.log('Find Snap By ID Called!');
	PG.knex('snaps').innerJoin('stores','snaps.store_id', 'stores.store_id').innerJoin('users','snaps.user_id','users.user_id').select().where('snap_id',snap_id).then(function(result) {
	  console.log("Result from db call: ");
	  console.log(result[0]);
	  cb(result[0]);
	});
};
// exports.addSnap = function (req, res) {
// 	console.log("Snap trying to be added!");
// 	//console.log(req);
// 	console.log(req.body);
// 	console.log(JSON.stringify(req.body.user));
// 	console.log(JSON.stringify(req.body.store));
// 	//res.send(201,null);
// 	var access_token = req.body.access_token;
// 	var eatery = 'https://desolate-plateau-4658.herokuapp.com/#!/places/' + req.body.store.store_id;
// 	eatery = '&eatery=' + encodeURIComponent(eatery);
// 	console.log("Encoded Eatery:" + eatery);
// 	var picture_url = req.body.picture_url;

// 	// var user_id = req.body.user_id;
// 	// var store_id = req.body.store_id;
// 	// var display_text;

// 	// if("display_text" in req.body) {
// 	// 	display_text = req.body.display_text;
// 	// }
// 	// else {
// 	// 	display_text = "$2 Gift Certificate!";
// 	// }
	

// 	//var access_token = '?access_token=' + 'CAACvtpYfgHIBAPVwWbFFjcE3Gwj2GJR7VuylzZBDpWmXMwZB93ewr5o4aJbEyZCj6vI2ENa14hOKjZAprOUy4Osg7aGbWZBXCu5zn5WVrBooFWgDuZB0JTy7s5TpiUsOiQeDOo8SI604yt6dWbX7bOzaM60P2s9nbCfDWppFDtcW9PocmiGym49PW2Rw9YTfCnVEPF0ZCaKTZC7MSx9ZAAYfqEIVWXjBAAIGVTZAZB3CZCZCKfQZDZD';
// 	//var eatery = 'https://desolate-plateau-4658.herokuapp.com/moltobene';

// 	//console.log("Uncoded Eatery:" + eatery);
// 	var baseURL = 'https://graph.facebook.com/me/tasteapplication:experience';
// 	var method = '&method=POST';
// 	var pictureURLforFB =  '&image[0][url]=' + encodeURIComponent(picture_url) + '&image[0][user_generated]=true';
// 	//var pictureURL =  '&image:url=' + encodeURIComponent('https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/10499434_10152165511185233_8074458132375143692_o.jpg') + '&image:user_generated=true';
// 	var explicitSharing = '&fb:explicitly_shared=true';
// 	var messageForFB = '&message=' + encodeURIComponent(req.body.snap_message);
// 	var resultingURL = baseURL + '?access_token=' + access_token + method + eatery + pictureURLforFB + explicitSharing + messageForFB;
// 	console.log("resulting url: " + resultingURL);
// 	request.post({url: resultingURL},function (error, response,body) {
// 		console.log("Error: " + error);
// 		console.log("Response: " + response);
// 		console.log("Body: " + body);
// 		var facebook_action_post_id = JSON.parse(body).id;
// 		console.log('Facebook Action Post Id: ' + facebook_action_post_id);
// 		PG.knex('snaps').insert(
// 			{user_id: req.body.user.user_id,
// 			 store_id: req.body.store.store_id,
// 			 received_promotion_id: req.body.promotion.promotion_id,
// 			 snap_message: req.body.snap_message,
// 			 snap_URL: picture_url,
// 			 facebook_action_post_id: facebook_action_post_id,
// 			 facebook_image_post_id: req.body.facebook_post_id
// 			 })
// 		.then(function(result) {
// 			  console.log(result);
// 		      res.send(201, null);
// 		});

// 	});


// };

// //Retrieve all Promotions where Query Parameters are met
// exports.findAll = function(req, res) {
// 	//console.log("pg");
// 	//console.log(PG);
// 	console.log('Find all Promotions In Existence!');
// 	var store_id = req.query.store_id;
// 	var user_id = req.query.user_id;
// 	var use_status = req.query.use_status;
// 	var model = PG.knex('promotions').innerJoin('stores','promotions.store_id', 'stores.store_id')
// 				.select('display_text','store_name','start_date','end_date','promotion_id');
// 	//console.log(knex('promotions').join('stores'));
// 	//var model = PG.knex('promotions').innerJoin('stores');
// 	//console.log(model.toString());
// 	//('stores','promotions.store_id','stores.store_id').select();
// 	if("store_id" in req.query) {
// 		model = model.where('promotions.store_id',store_id);
// 	}

// 	if("user_id" in req.query) {
// 		model = model.where('user_id',user_id);
// 	}

// 	if("use_status" in req.query) {
// 		model = model.where('use_status',use_status);
// 	}
// 	model = model.where(PG.knex.raw("end_date > timezone('utc'::text, now())"));

// 	console.log(model.toString());
// 	//model = model.where(PG.knex.raw("start_date < timezone('utc'::text, now())"));
// 	//console.log("REACHED");
// 	model.then(function(result) {
// 	  console.log(result);	     
// 	  res.send("{Promotions: " + JSON.stringify(result) + "}");
// 	});
// };

// exports.addPromotion = function(req,res) {
// 	console.log("Promotion trying to be added!");
// 	var user_id = req.body.user_id;
// 	var store_id = req.body.store_id;
// 	var display_text;

// 	if("display_text" in req.body) {
// 		display_text = req.body.display_text;
// 	}
// 	else {
// 		display_text = "$2 Gift Certificate!";
// 	}
	

// 	PG.knex('promotions').insert(
// 		{user_id: user_id,
// 		 store_id: store_id,
// 		 display_text: display_text})
// 	.then(function(result) {
// 		  console.log(result);
// 	      res.send(201, null);
// 	});
// };

// exports.redeemPromotion = function(req,res) {
// 	console.log("Promotion trying to be redeemed!");
// 	var promotion_id = req.body.promotion_id;

// 	PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
// 		console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
// 		res.send(201, null);
// 	});


// };

// //Retrieve a User by their ID
// exports.findById = function(req, res) {


// 	console.log('Find Promotions By ID Called!');
// 	PG.knex('promotions').select().where('promotion_id',promotion_id).then(function(result) {
// 	  console.log(result[0].display_text);	     
// 	  res.send(result);
// 	});
// };

// // // //If local db doesn't work, run 'heroku pg:credentials' and replace the address
// // var connection = process.env.DATABASE_URL 
// // 	|| 'postgres://khctwifcwaratd:D4-FK0pynGsG7S_wuOn4m1Cyrw@ec2-54-243-48-227.compute-1.amazonaws.com:5432/d81o6v1corf28q?ssl=true';

