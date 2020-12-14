let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res) {
    db.collection('companies').find().toArray()
        .then(result => res.json(result))
        .catch(err => {res.send(err)});
});

router.post('/', function (req, res) {
    req.body.creationDate = req.body.creationDate.substring(0,10);
    db.collection('companies').insertOne(req.body)
        .then(() => res.json({_id: req.body._id}))
        .catch(err => {
            if (err.code = 11000) { // if there already exist a company in the company collection
                res.status(400).json({...err,message: 'Le nom de l\'entreprise est déjà utilisé'});
            } else {
                res.send(err)
            }
        });
});

router.get('/:id', function (req, res) {
    const companyObjectId = new ObjectId(req.params.id)
    db.collection('companies').findOne({_id: companyObjectId})
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => res.send(err));
});

router.delete('/:id', function (req, res) {
    const companyObjectId = new ObjectId(req.params.id);
    db.collection('companies').deleteOne({_id: companyObjectId})
        .then(() => res.end())
        .catch(err => {res.send(err)});
});

router.put('/:id', function(req, res) {
    const companyObjectId = new ObjectId(req.params.id);
    db.collection('companies').update({_id: companyObjectId}, {...req.body, _id: companyObjectId})
        .then(() => res.end())
        .catch(err => {
            if (err.code = 11000) { // if there already exist a company in the company collection
                res.status(400).json({...err,message: 'Le nom de l\'entreprise est déjà utilisé'});
            } else {
                res.send(err)
            }
        });
});

module.exports = router;
