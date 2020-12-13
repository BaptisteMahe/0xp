var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/softskills/', function (req, res, next) {
    db.collection('softskills').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

router.get('/domaines/', function (req, res, next) {
    db.collection('domaines').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

router.get('/sectors/', function (req, res, next) {
    db.collection('sectors').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

module.exports = router;
