var express = require('express');
var router = express.Router();

var config = require('../config.json');
var sleep = require('sleep-async')();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.database);

/* GET trip page. */
router.post('/', function(req, res, next) {
	console.log(JSON.stringify(req.body));
	var returnData = {
		status: 'ok'
	};
	res.send(returnData);
});

module.exports = router;
