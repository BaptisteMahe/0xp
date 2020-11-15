var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const Company = require("./company.model");
var ObjectId = require('mongodb').ObjectId


router.get('/', function (req, res, next) {
    db.collection('companies').find().toArray(function (err, results) {
        res.json(results)
    })
});


router.get('/:id', function (req, res, next) {
    const oid = new ObjectId(req.params.id)
    db.collection('companies').findOne({
            _id: oid
        })
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
});

router.post('/', function (req, res, next) {
    db.collection('companies').countDocuments({
        name: req.body.name
    }, function (error, countDocuments) {
        if (countDocuments === 0) {
            req.body.creationDate = req.body.creationDate.substring(0,10);
            let company = new Company(req.body);
            db.collection('companies').insertOne(company).then(() => res.end())
                .catch(err => next(err));
        } else {
            res.status(400).json({
                message: 'Le nom de l\'entreprise est déjà utilisé'
            })
        }

    });

});

module.exports = router;
