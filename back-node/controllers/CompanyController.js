const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
    db.collection('companies').find().toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.post('/', function (req, res, next) {
    req.body.creationDate = req.body.creationDate.substring(0,10);
    db.collection('companies').insertOne(req.body)
        .then(() => res.json({_id: req.body._id}))
        .catch(err => {
            if (err.code === 11000) err = {...err, message: "Le nom de l'entreprise est déjà utilisé", code: 400};
            next(err);
        });
});

router.get('/:id', function (req, res, next) {
    db.collection('companies').findOne({_id: ObjectId(req.params.id)})
        .then(company => company ? res.json(company) : next({message: "Company not found.", code: 404}))
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    db.collection('companies').deleteOne({_id: ObjectId(req.params.id)})
        .then(() => res.json({_id: req.params.id}))
        .catch(next);
});

router.put('/:id', function(req, res, next) {
    db.collection('companies').update({_id: ObjectId(req.params.id)}, {...req.body, _id: ObjectId(req.params.id)})
        .then(() => res.json({_id: req.params.id}))
        .catch(err => {
            if (err.code === 11000) err = {...err, message: "Le nom de l'entreprise est déjà utilisé", code: 400};
            next(err)
        });
});

module.exports = router;
