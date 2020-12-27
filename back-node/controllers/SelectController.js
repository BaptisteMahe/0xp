const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/softSkills/', function (req, res, next) {
    db.collection('softSkills').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

router.get('/domains/', function (req, res, next) {
    db.collection('domains').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

router.get('/sectors/', function (req, res, next) {
    db.collection('sectors').find().toArray()
        .then(results => res.json(results))
        .catch(next)
});

router.get('/companies/', function (req, res, next) {
    db.collection('companies').find().toArray()
        .then(results => res.json(formatCompaniesToSelectOption(results)))
        .catch(next);
});

router.get('/locations/', function (req, res, next) {
    db.collection('offers').find().toArray()
        .then(results => res.json(formatOffersToLocationSelectOption(results)))
        .catch(next);
});

module.exports = router;

function formatCompaniesToSelectOption(jsonArray) {
    let selectOptions = [];
    jsonArray.forEach(company => {
        selectOptions.push({
            id: company._id,
            value: company.name,
            display: company.name
        });
    })
    return selectOptions;
}

function formatOffersToLocationSelectOption(jsonArray) {
    let selectOptions = [];
    jsonArray.forEach(offer =>{
        const selectOption = {
            value: offer.location,
            display: offer.location
        };
        if (!selectOptions.includes(selectOption)) {
            selectOptions.push(selectOption);
        }
    });
    return selectOptions;
}
