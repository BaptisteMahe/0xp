let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let ObjectId = require('mongodb').ObjectId

router.get('/', function(req, res) {
    db.collection('avis').find().toArray()
        .then(result => res.json(result))
        .catch(err => {res.send(err)});
});

router.get('/:id', function(req, res) {
    const avidObjectId = new ObjectId(req.params.id)
    db.collection('avis').findOne({_id : avidObjectId})
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => {res.send(err)});
});

router.get('/company/:id', function(req, res) {
    db.collection('avis').find({idCompany : req.params.id}).toArray()
        .then(result => res.json(result))
        .catch(err => {res.send(err)});
});

router.post('/', function(req, res) {    
    db.collection('avis').insertOne(req.body)
        .then(() => res.json({}))
        .catch(err => {res.send(err)});
});

module.exports = router;
