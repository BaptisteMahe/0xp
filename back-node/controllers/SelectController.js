var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/softskills/', function (req, res) {
    db.collection('softskills').find().toArray(function (err, results) {
        res.json(results);
    })
});

router.get('/domaines/', function (req, res) {
    db.collection('domaines').find().toArray(function (err, results) {
        res.json(results);
    })
});

router.get('/sectors/', function (req, res) {
    db.collection('sectors').find().toArray(function (err, results) {
        res.json(results);
    })
});

module.exports = router;
