let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

let notificationModule = require('../modules/notificationModule.js')
let matchingModule = require('../modules/matchingModule.js')

router.get('/', function (req, res) {
    db.collection('offers').find().toArray(function (err, results) {
        res.json(results);
    });
});


router.post('/', function (req, res) {
    const promiseGet = new Promise(function (resolve) {
        db.collection('offers').find().toArray(function (err, results) {
            let cpt = 0;
            results.forEach((offer) => {
                // Company associated to the offer
                db.collection('companies').findOne({ "_id": offer.id_company },
                    function (err, company) {
                    //Matching
                        offer.company = company.name;
                        offer.srcImgCompany = company.srcImage;
                        offer.matchingScore = matchingModule.matchingWithUser(offer, req.body, company, {});
                        cpt++;
                        if (cpt === results.length) {
                            resolve(results);
                        }
                });
            });
        });
    });

    promiseGet.then(function (results) {
        res.json(results);
    });

});

router.post('/filtered', function (req, res) {
    let query = buildQuery(req.body.filter);
    db.collection('offers').find(query).toArray(function (err, results) {
        res.json(results);
    });
});

function buildQuery(filter){
    console.log(filter);
    let query = [];

    if (filter.textInput) {
        let textAttributeArray = ["title", "company", "location", "sector", "type", "description"];
        let textInputQuery = { $or: []};
        textAttributeArray.forEach(textAttribute => {
            textInputQuery.$or.push({[textAttribute]: {$regex: `.*${filter.textInput}.*`, $options: 'i'}});
        })
        query.push(textInputQuery);
    }

    let primaryCriteriaArray = ["type", "duration", "sector"];
    primaryCriteriaArray.forEach(criteria => {
        addPrimaryCriteriaToQuery(criteria, query, filter);
    });

    if (filter.location.length) {
        let locationQuery = {$or: []};
        filter.location.forEach(location => {
            locationQuery.$or.push({location: location.value})
        });
        query.push(locationQuery);
    }
    if (filter.company.length) {
        let companyQuery = {$or: []};
        filter.company.forEach(company => {
            companyQuery.$or.push({id_company: new ObjectId(company.id)})
        });
        query.push(companyQuery);
    }

    if (filter.isPartner) {
        // TODO: Find a way to check partnership of company proposing offer
    }

    if (filter.publicationDate) {
        // TODO: Remake Publication Date management
    }

    if (filter.companySize) {
        // TODO: Find a way to check size of company proposing offer
    }

    if (filter.matchingMini) {
        // TODO: Find a way to check matching score of offer with currentUser
    }

    if (filter.remunMini) {
        query.push({remuneration: {$gte: filter.remunMini}});
    }

    return query.length ? {$and: query} : {};
}

function addPrimaryCriteriaToQuery(criteria, query, filter) {
    if (filter[criteria]) {
        query.push({[criteria]: filter[criteria]});
    }
}

router.get('/byCompanyId', function (req, res) {
    let id = mongoose.Types.ObjectId(req.query["id"]);

    db.collection('offers').find({ "id_company": id })
        .toArray(function (err, results) {
        res.json(results);
    });
});


router.post('/post', function (req, res) {
    req.body.id_company = mongoose.Types.ObjectId(req.body.id_company);
    db.collection('offers').insertOne(req.body);
    db.collection('companies').findOne({ _id: req.body.id_company },
        function (findErr, company) {
            //On check si quelqu'un attendait une offre de ce type
            notificationModule.checkNotifForAllUsers(req.body, company);
        }
    );

    res.send(req.body);
});

router.put('/update', function (req, res) {
    var idOffer = mongoose.Types.ObjectId(req.body["id"])
    delete req.body.id;
    delete req.body.matchingScore;
    req.body.id_company = mongoose.Types.ObjectId(req.body.id_company)
    db.collection('offers').update({
        "_id": idOffer
    }, req.body);
    //On check si quelqu'un attendait une offre de ce type
    notificationModule.checkNotifForAllUsers(req.body)
    res.send(req.body);
});

router.delete('/deleteById/:id', function (req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);

    db.collection('offers').remove({ _id: id });
    res.send(req.body);
});

router.get('/byId/:id', function (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);

    db.collection('offers').findOne({
        _id: id
    })
        .then(offer => offer ? res.json(offer) : res.sendStatus(404))
        .catch(err => next(err));
});

module.exports = router;
