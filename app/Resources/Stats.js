var PG = require('./knex');
var async = require('async');

exports.getStoreStats = function(req, res) {
	var store_id = req.params.store_id;
	var queries = [];
	//var intervals = [1,7,30,100000];
	var intervals = [1,7,30,100000];

	var base_queries = 
	[{name: '# Snaps Taken',
	 query: "SELECT COUNT(*) FROM snaps WHERE store_id = CUSTOM_STORE_ID AND created_at > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Gifts Given',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND created_at > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Snap-Based Gifts Given',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND referring_user_id IS NULL AND created_at > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Referral-Based Gifts Given',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND referring_user_id IS NOT NULL AND created_at > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Gifts Redeemed',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND use_status = 'used' AND redeemed_date > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Snap-Based Gifts Redeemed',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND use_status = 'used' AND referring_user_id IS NULL AND redeemed_date > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# Referral-Based Gifts Redeemed',
	 query: "SELECT COUNT(*) FROM promotions WHERE store_id = CUSTOM_STORE_ID AND use_status = 'used' AND referring_user_id IS NOT NULL AND redeemed_date > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"},

	 {name: '# First-Time Users',
	 query: "SELECT COUNT(*) FROM (SELECT user_id, MIN(created_at) AS most_recent_activity FROM promotions WHERE store_id = CUSTOM_STORE_ID GROUP BY user_id) AS MOST_RECENT WHERE most_recent_activity > TIMEZONE('UTC', NOW()) - INTERVAL 'INTERVAL_TO_SPAN' DAY;"}
	 ];

	var raw_query;

	base_queries.forEach(function(one_query) {
		var span_query = [];
		for (i=0;i<intervals.length;i++) {
			raw_query = one_query.query;
			raw_query = raw_query.replace('CUSTOM_STORE_ID',store_id + "");
			raw_query = raw_query.replace('INTERVAL_TO_SPAN',intervals[i] + "");
			span_query.push({name:one_query.name,query:raw_query,span: intervals[i],index:i});
		}
		queries.push(span_query);
	});



	//var sendResultOfQueries = _.after(queries.length, sendResponse);

	var results = [];

	async.each(queries, function(one_query,cb) {
		
		// var resultToPush = [];
		// var name;

		var performOnEach = function(span_query, callback) {
			PG.knex.raw(span_query.query).then(function (result) {
				span_query.result = result.rows[0].count;
				//resultToPush[span_query.index] = result[0];
				//name = span_query.name;
				//console.log(span_query.query);
				console.log("Result: " + result.rows[0].count);
				callback(null);
			});
			// .catch(function(err) {
			// 	console.log("ERROR perform in stats.js");
			// 	console.error(err);
			// 	callback(err);
			// });
		};


		async.each(one_query, performOnEach, function (err) {
			//console.log("Try to destroy connections");
			//PG.knex.destroy();
			if (err) {
				console.log("Inner Loop Stats.js getStoreStats Error");
				console.log(err);
				cb(err);
			}
			else {
				cb();
			}
			//results.push({stats: resultToPush, name: name});
		});

	}, function (err) {
		if (err) {
			console.log("Outer Loop Stats.js getStoreStats Error");
			console.log(err);
		}
		console.log("Finished Results of Stat.js getStoreStats");
		//console.log(queries);
		res.send(201,'{"stats": ' + JSON.stringify(queries) + '}');
		
	});	


};
