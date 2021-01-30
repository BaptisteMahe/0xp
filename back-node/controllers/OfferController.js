const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
    db.collection('offers').find({ isValidated: req.query.isValidated == 'true'}).toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.post('/', function (req, res, next) {
    const offer = formatPropertiesTypes(req.body);
    db.collection('offers').insertOne(offer)
        .then(result => res.json({ _id: result.insertedId }))
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    db.collection('offers').findOne({ _id: ObjectId(req.params.id) })
        .then(offer => offer ? res.json(offer) : next({ message: "Offer not found.", code: 404 }))
        .catch(next);
});

router.put('/:id', function (req, res, next) {
    const offer = formatPropertiesTypes(req.body);
    db.collection('offers').updateOne({ _id: offer._id }, { $set: offer })
        .then(() => res.json({ _id: offer._id }))
        .catch(next);
});

router.delete('/:id', function (req, res, next) {
    db.collection('offers').findOneAndDelete({ _id: ObjectId(req.params.id) })
        .then(() => res.json({ _id: req.params.id }))
        .catch(next);
});

router.get('/validate/:id', function (req, res, next) {
    db.collection('offers').updateOne({ _id: ObjectId(req.params.id) }, { $set: {isValidated: true} })
        .then(() => res.json({ _id: req.params.id }))
        .catch(next);
});

router.get('/byCompanyId/:id', function (req, res, next) {
    db.collection('offers').find({ "company._id":  ObjectId(req.params.id) }).toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.post('/filter', function (req, res, next) {
    let query = buildQuery(req.body.filter);
    db.collection('offers').find(query).toArray()
        .then(results => res.json(results))
        .catch(next);
});

router.get('/addView/:id', function(req, res, next) {
    db.collection('offers').updateOne({ _id: ObjectId(req.params._id) }, {
        $inc: { views: 1 }
    })
        .then(() => res.json({ _id: req.params._id }))
        .catch(next);
});

module.exports = router;

function formatPropertiesTypes(offer) {
    if (offer._id) {
        offer._id = ObjectId(offer._id);
    }
    if (offer.pdfId) {
        offer.pdfId = ObjectId(offer.pdfId);
    }
    offer.company._id = ObjectId(offer.company._id);
    offer.sector._id = ObjectId(offer.sector._id);
    offer.domains.forEach((domain, index) => {
        offer.domains[index]._id = ObjectId(domain._id);
    });

    offer.startDate = new Date(offer.startDate);
    offer.createdDate = new Date(offer.createdDate);

    if(offer.remuneration) {
        offer.remuneration = parseInt(offer.remuneration);
    } else {
        delete offer.remuneration;
    }

    return offer;
}

function buildQuery(filter){
    let query = [];

    if (filter.textInput) {
        let textAttributeArray = ["title", "company.display", "location", "sector.display", "type", "description"];
        let textInputQuery = { $or: [] };
        textAttributeArray.forEach(textAttribute => {
            textInputQuery.$or.push({ [textAttribute]: { $regex: `.*${filter.textInput}.*`, $options: 'i' }});
        })
        query.push(textInputQuery);
    }

    let primaryCriteriaArray = ["type", "duration"];
    primaryCriteriaArray.forEach(criteria => {
        addPrimaryCriteriaToQuery(criteria, query, filter);
    });

    if (filter.sector) {
        query.push({ "sector._id": ObjectId(filter.sector._id) });
    }

    if (filter.studentType) {
        query.push({ studentTypes: {$all: [filter.studentType]} });
    }

    if (filter.location && filter.location.length) {
        let locationQuery = { $or: [] };
        filter.location.forEach(location => {
            locationQuery.$or.push({ location: location._id });
        });
        query.push(locationQuery);
    }

    if (filter.matchingMini) {
        // TODO: Find a way to check matching score of offer with currentUser
    }

    if (filter.remunMini) {
        query.push({remuneration: { $gte: filter.remunMini }});
    }

    return query.length ? { $and: query } : { };
}

function addPrimaryCriteriaToQuery(criteria, query, filter) {
    if (filter[criteria]) {
        query.push({ [criteria]: filter[criteria] });
    }
}
