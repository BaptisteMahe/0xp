let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
const ObjectId = require('mongodb').ObjectId;

let notificationModule = require('../modules/notificationModule.js')

router.get('/', function (req, res, next) {
    db.collection('offers').find().toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.post('/', function (req, res, next) {
    req.body.id_company = ObjectId(req.body.id_company)
    db.collection('offers').insertOne(req.body)
        .then(() => {
            db.collection('companies').findOne({ _id: req.body.id_company })
                .then((company) => {
                    notificationModule.checkNotifForAllUsers(req.body, company);
                    res.send(req.body)
                })
                .catch(next);
        })
        .catch(next)
});

router.get('/:id', function (req, res, next) {
    db.collection('offers').findOne({ _id: ObjectId(req.params.id) })
        .then(offer => res.json(offer))
        .catch(next)
});

router.put('/:id', function (req, res, next) {
    delete req.body.id;
    delete req.body.matchingScore;
    req.body.id_company = ObjectId(req.body.id_company)
    db.collection('offers').update({ "_id": ObjectId(req.params.id) }, req.body)
        .then(() => {
            notificationModule.checkNotifForAllUsers(req.body)
            res.json(req.body);
        })
        .catch(next)
});

router.delete('/:id', function (req, res, next) {
    db.collection('offers').remove({ _id: ObjectId(req.params.id) })
        .then(() => res.send(req.body))
        .catch(next)
});

router.get('/byCompanyId/:id', function (req, res, next) {
    db.collection('offers').find({ "id_company":  ObjectId(req.params.id) }).toArray() 
        .then(results => res.json(results))
        .catch(next)
});

router.post('/filter', function (req, res, next) {
    let query = buildQuery(req.body.filter);
    db.collection('offers').find(query).toArray()
        .then(results => res.json(results))
        .catch(next);
});

function buildQuery(filter){
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

module.exports = router;
