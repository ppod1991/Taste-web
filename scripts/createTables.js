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

Bookshelf.PG.knex.schema.createTable('stores', function (table) {
	table.string('name');
	table.increments('store_id');
	table.string('owner_name');
	table.string('owner_email');
	table.string('enrolled_plan');
	table.string('cuisine');
	table.string('URL');
	table.string('street_address');
	table.string('city');
	table.string('state');
	table.string('zipcode');
	table.timestamps(); })
	.then(function() {
		console.log('Stores Table is Created!');
	});

Bookshelf.PG.knex.schema.createTable('users', function (table) {
	table.string('first_name');
	table.increments('user_id');
	table.string('facebook_id');
	table.string('last_name');
	table.date('date_of_birth');
	table.string('gender');
	table.string('location_id');
	table.string('email');
	table.string('phone_number');
	table.string('dietary_restrictions');
	table.string('profile_picture_URL');
	table.timestamps(); }).then(function() {
		console.log('Users Table is Created!');
	});

Bookshelf.PG.knex.schema.createTable('snaps', function (table) {
	table.integer('user_id');
	table.increments('snap_id');
	table.integer('store_id');
	table.dateTime('date_of_birth');
	table.float('price');
	table.integer('used_promotion_id');
	table.integer('received_promotion_id');
	table.string('snap_URL');
	table.timestamps(); }).then(function() {
		console.log('Snaps Table is Created!');
	});