let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let ObjectId = require('mongodb').ObjectId

router.get('/', function(req, res, next) {
    db.collection('avis').find().toArray(function(err, results){
        res.json(results)
    })
});

router.get('/:id', function(req, res, next) {
    const avidObjectId = new ObjectId(req.params.id)
    db.collection('avis').findOne({_id : avidObjectId})
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
});

router.get('/company/:id', function(req, res, next) {
    db.collection('avis').find({idCompany : req.params.id}).toArray(function(err, results){
        res.json(results)
    })
});

router.post('/', function(req, res, next) {    
    db.collection('avis').insertOne(req.body).then(() => res.json({}))
            .catch(err => next(err));
});



module.exports = router;
