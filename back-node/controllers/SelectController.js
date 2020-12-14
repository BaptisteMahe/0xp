let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/softskills/', function (req, res) {
    db.collection('softskills').find().toArray(function (err, results) {
        res.json(results);
    })
});

router.get('/domaines/', function (req, res) {
    db.collection('domaines').find().toArray(function (err, results) {
        res.json(results);
    })
});

router.get('/sectors/', function (req, res) {
    db.collection('sectors').find().toArray(function (err, results) {
        res.json(results);
    })
});

router.get('/companies/', function (req, res) {
    db.collection('companies').find().toArray(function (err, results) {
        res.json(formatCompaniesToSelectOption(results));
    });
});

router.get('/locations/', function (req, res) {
    db.collection('offers').find().toArray(function (err, results) {
        res.json(formatOffersToLocationSelectOption(results));
    });
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
    return selectOptions
}

function formatOffersToLocationSelectOption(jsonArray) {
    let selectOptions = [];
    jsonArray.forEach(offer =>{
        let selectOption = {
            value: offer.location,
            display: offer.location
        };
        if (!selectOptions.includes(selectOption)) {
            selectOptions.push(selectOption);
        }
    });
    return selectOptions
}
