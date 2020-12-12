let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const Company = require("./company.model");
let ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
    db.collection('companies').find().toArray(function (err, results) {
        console.log(results)
        res.json(results);
    })
});

router.post('/', function (req, res, next) {
    req.body.creationDate = req.body.creationDate.substring(0,10);
    let company = new Company(req.body);
    db.collection('companies').insertOne(company).then(() => res.end())
        .catch(err => {
            if (err.code = 11000) {
                res.status(400).json({
                    message: 'Le nom de l\'entreprise est déjà utilisé'
                });
            } else {
                next(err)
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
    }, function(error) {
        if (error) {
            res.send(error);
        } else {
            res.end();
        }
    });
});

router.put('/update', function(req, res, next) {
    req.body._id = new ObjectId(req.body._id);
    db.collection('companies').update({
        _id: req.body._id
    }, req.body, (error) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            res.end();
        }
    });
});

module.exports = router;
