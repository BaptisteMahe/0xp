let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const Company = require("./company.model");
let ObjectId = require('mongodb').ObjectId;


router.get('/', function (req, res, next) {
    db.collection('companies').find().toArray(function (err, results) {
        res.json(results);
    })
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
            });
        }
    });
});

router.get('/:id', function (req, res, next) {
    const companyObjectId = new ObjectId(req.params.id)
    db.collection('companies').findOne({
        _id: companyObjectId
    })
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
});

router.delete('/:id', function (req, res, next) {
    const companyObjectId = new ObjectId(req.params.id);
    db.collection('companies').deleteOne({
        _id: companyObjectId
    }, function(error, obj) {
        if (error) {
            res.send(error);
        } else {
            res.end();
        }
    });
});

module.exports = router;
