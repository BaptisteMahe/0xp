const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ObjectId = require('mongodb').ObjectId

router.get('/', function(req, res, next) {
    db.collection('avis').find().toArray()
        .then(result => res.json(result))
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    db.collection('avis').findOne({_id : ObjectId(req.params.id)})
        .then(avis => avis ? res.json(avis) : next({"message": "Avis not found.", "code": 404}))
        .catch(next);
});

router.get('/company/:id', function(req, res, next) {
    db.collection('avis').find({companyId : ObjectId(req.params.id)}).toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.post('/', function(req, res, next) {
    req.body.companyId = ObjectId(req.body.companyId);
    db.collection('avis').insertOne(req.body)
        .then(result => res.json({_id: result.insertedId}))
        .catch(next);
});

module.exports = router;
