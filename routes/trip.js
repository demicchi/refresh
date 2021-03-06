var express = require('express');
var router = express.Router();

var config = require('../config.json');
var sleep = require('sleep-async')();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.database);

/* GET trip page. */
router.get('/:id', function(req, res, next) {
	db.serialize(function() {
		var members = [];
		var payments = [];
		
		db.run("PRAGMA foreign_keys = true;");
		db.all("SELECT id, name FROM member WHERE trip_id = ?", req.params.id, function(err, rows) {
			if (!err) {
				members = rows;
			}
		});
		
		var queue = 0;
		db.each("SELECT payment.id payment_id," +
			"payment.description description, " +
			"member.name payer_name, " +
			"payment.amount amount " +
			"FROM payment, member " +
			"ON payment.payer = member.id " +
			"WHERE payment.trip_id = ?", req.params.id, function(err, payment) {
			if (!err) {
				queue++;
				db.all("SELECT member_id FROM defrayer WHERE payment_id = ?", payment.payment_id, function(err, rows) {
					payment.defrayers = [];
					members.forEach(function(member) {
						var found = rows.some(function(element, index, array) {
							return (member.id == element.member_id);
						});
						payment.defrayers.push((found) ? true : false);
					});
					payments.push(payment);
					queue--;
				});
			}
		}, function(err, num) {
			sleep.sleepWithCondition(function() {
				return queue == 0;
			},
			10000,
			function() {
				res.render('trip', {
					appName: config.appName,
					members: members,
					payments: payments
				});
			});
		});
	});
});

module.exports = router;
