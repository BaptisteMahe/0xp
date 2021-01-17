const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/softSkills/', function (req, res, next) {
    db.collection('softSkills').find().toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.get('/domains/', function (req, res, next) {
    db.collection('domains').find().toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.get('/sectors/', function (req, res, next) {
    db.collection('sectors').find().toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.get('/companies/:isImgIncluded', function (req, res, next) {
    db.collection('companies').find().toArray()
        .then(results => res.json(formatCompaniesToSelectOption(results, (req.params.isImgIncluded === 'true'))))
        .catch(next);
});

router.get('/locations/', function (req, res, next) {
    db.collection('offers').find().toArray()
        .then(results => res.json(formatOffersToLocationSelectOption(results)))
        .catch(next);
});

module.exports = router;

function formatCompaniesToSelectOption(jsonArray, isImgIncluded) {
    let selectOptions = [];
    jsonArray.forEach(company => {
        if (isImgIncluded) {
            selectOptions.push({
                _id: company._id,
                display: company.name,
                srcImg: company.srcImage
            });
        } else {
            selectOptions.push({
                _id: company._id,
                display: company.name
            });
        }
    })
    return selectOptions;
}

function formatOffersToLocationSelectOption(jsonArray) {
    let selectOptions = [];
    jsonArray.forEach(offer =>{
        const selectOption = {
            _id: offer.location,
            display: offer.location
        };
        if (!selectOptions.some(element => element._id === selectOption._id)) {
            selectOptions.push(selectOption);
        }
    });
    return selectOptions;
}
