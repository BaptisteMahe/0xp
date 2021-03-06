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
    const company = formatPropertiesTypes(req.body);
    db.collection('companies').insertOne(company)
        .then(result => res.json({_id: result.insertedId}))
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
    const company = formatPropertiesTypes(req.body);
    db.collection('companies').updateOne({_id: ObjectId(req.params.id)}, {$set: company})
        .then(() => {
            db.collection('offers').updateMany({'company._id': ObjectId(req.params.id)}, {
                $set: {
                    'company.srcImg': company.srcImage,
                    'company.display': company.name,
                    'company.isPartner': company.isPartner
                }
            })
                .then(() => res.json({_id: req.params.id}))
                .catch(next);
        })
        .catch(err => {
            if (err.code === 11000) err = {...err, message: "Le nom de l'entreprise est déjà utilisé", code: 400};
            next(err);
        });
});

module.exports = router;

function formatPropertiesTypes(company) {

    Object.keys(company).forEach(property => {
        if (company[property] === null || company[property] === undefined) {
            delete company[property];
        }
    });

    if (company._id) {
        company._id = ObjectId(company._id);
    }

    return company;
}
