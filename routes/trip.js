var express = require('express');
var router = express.Router();

var config = require('../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.database);

/* GET trip page. */
router.get('/:id', function(req, res, next) {
	db.serialize(function() {
		db.run("PRAGMA foreign_keys = true;");
		db.all("SELECT payment.id payment_id," +
			"payment.description description, " +
			"member.name payer_name, " +
			"payment.amount amount " +
			"FROM payment, member " +
			"ON payment.payer = member.id " +
			"WHERE payment.trip_id = ?", req.params.id, function(err, rows) {
			if (!err) {
				res.render('trip', {
					appName: config.appName,
					payments: rows
				});
			}
		});
	});
});

module.exports = router;
