var express = require('express');
var router = express.Router();

var config = require('../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.database);

/* GET home page. */
router.get('/', function(req, res, next) {
    db.serialize(function() {
        db.all("SELECT * FROM trip", function(err, rows){
            if (!err) {
                res.render('index', {
                    appName: config.appName,
                    trips: rows
                });
            }
        });
    });
});

module.exports = router;
