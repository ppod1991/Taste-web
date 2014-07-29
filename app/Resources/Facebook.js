// var PG = require('./knex');
// var request = require('request');

// exports.newVisitGET = function(req,res) {
// 	console.log("New Visit GET called!");
// 	console.log(req.body);
// 	res.send("{'success'='true'}");
// 	//var promotion_id = req.body.promotion_id;

// 	// PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
// 	// 	console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
// 	// 	res.send(201, null);
// 	// });
	

// };


// exports.newVisitPOST = function(req,res) {
// 	console.log("New Visit POST called");
// 	//var promotion_id = req.body.promotion_id;
// 	console.log(req.body);
// 	// PG.knex('promotions').where('promotion_id',promotion_id).update({use_status:'used'}).then(function(result) {
// 	// 	console.log("Promotion with Promotion_id: " + promotion_id + " redeemed!");
// 	// 	res.send(201, null);
// 	// });
	
// 		res.send(201,"{'success'='true'}");

// };

// exports.experienceEatery = function(req, res) {
// 	var access_token = '?access_token=' + req.body.accessToken;
// 	var eatery = req.body.eatery;
// 	var pictureURL = encodeURIComponent(req.body.picture_url);
// 	console.log("Experience Eatery Reached!");
// 	//var access_token = '?access_token=' + 'CAACvtpYfgHIBAPVwWbFFjcE3Gwj2GJR7VuylzZBDpWmXMwZB93ewr5o4aJbEyZCj6vI2ENa14hOKjZAprOUy4Osg7aGbWZBXCu5zn5WVrBooFWgDuZB0JTy7s5TpiUsOiQeDOo8SI604yt6dWbX7bOzaM60P2s9nbCfDWppFDtcW9PocmiGym49PW2Rw9YTfCnVEPF0ZCaKTZC7MSx9ZAAYfqEIVWXjBAAIGVTZAZB3CZCZCKfQZDZD';
// 	//var eatery = 'http://www.getTaste.co/moltobene';

// 	console.log("Uncoded Eatery:" + eatery);
// 	eatery = '&eatery=' + encodeURIComponent(eatery);
// 	console.log("Encoded Eatery:" + eatery);
// 	var baseURL = 'https://graph.facebook.com/me/tasteapplication:experience';
// 	var method = '&method=POST';
// 	var pictureURL =  '&image[0][url]=' + encodeURIComponent(picturURL) + '&image[0][user_generated]=true';
// 	//var pictureURL =  '&image:url=' + encodeURIComponent('https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/10499434_10152165511185233_8074458132375143692_o.jpg') + '&image:user_generated=true';
// 	var explicitSharing = '&fb:explicitly_shared=true';
// 	var resultingURL = baseURL + access_token + method + eatery + pictureURL + explicitSharing;
// 	console.log(resultingURL);
// 	request.post({url: resultingURL},function (error, response,body) {
// 		console.log("Error: " + error);
// 		console.log("Response: " + response);
// 		console.log("Body: " + body);

// 		res.send(201, null);
// 	});
// };
 
