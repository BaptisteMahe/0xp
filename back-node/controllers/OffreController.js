var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID
router.use(bodyParser.json());
var mongoose = require('mongoose');

var notificationModule = require('../modules/notificationModule.js')
var matchingModule = require('../modules/matchingModule.js')

const escapeStringRegexp = require('escape-string-regexp')

router.get('/', function (req, res) {
    db.collection('offers').find().toArray(function (err, results) {
        res.json(results);
    })
});


router.post('/', function (req, res) {
    const promiseGet = new Promise(function(resolve, reject) {
        db.collection('offers').find().toArray(function (err, results) {
            cpt=0
            results.forEach((offer) => {
                // Company associated to the offer
                db.collection('companies').findOne({
                    "_id": offer.id_company
                }, function(err,company) {
                    //Matching
                    offer.matchingScore = matchingModule.matchingWithUser(offer,req.body,company,{}); 
                    cpt++
                    if (cpt==results.length){
                        resolve(results);
                    }
                })
            });
        });
    });

    promiseGet.then(function(results) {
        res.json(results);
    });
    
});

router.post('/filtered', function (req, res) {
    query = {}
    filter=req.query
    if (Object.keys(req.query).indexOf("type") > -1) {
        query["type"] = new RegExp('^' + escapeStringRegexp(req.query["type"]) + '$', 'i');
    }
    if (Object.keys(req.query).indexOf("duration") > -1) {
        query["duration"] = new RegExp('^' + escapeStringRegexp(req.query["duration"]) + '$', 'i');
    }
    if (Object.keys(req.query).indexOf("sector") > -1) {
        query["sector"] = new RegExp('^' + escapeStringRegexp(req.query["sector"]) + '$', 'i');
    }

    /* FILTRE AVANCE EST UN FILTRE ACTIF */

    /*if (Object.keys(req.query).indexOf("start_date") > -1) {
        query["start_date"] = {
            $gte: req.query["start_date"]
        }
    }
    if (Object.keys(req.query).indexOf("remunMini") > -1) {
        query["remuneration"] = {
            $gte: +req.query["remunMini"]
        }
    }
    if (Object.keys(req.query).indexOf("location") > -1) {
        locations = req.query["location"].split(";")
        locations.splice(-1, 1)
        query["location"] = {
            $in: locations
        }
    }
    if (Object.keys(req.query).indexOf("company") > -1) {
        companies = req.query["company"].split(";")
        companies.splice(-1, 1)
        query["company"] = {
            $in: companies
        }
    }
    if (Object.keys(req.query).indexOf("publicationDate") > -1) {
        correspondance = {
            "today": (new Date()).getTime() - 24 * 60 * 60 * 1000,
            "week": (new Date()).getTime() - 7 * 24 * 60 * 60 * 1000,
            "month": (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000
        }
        //On cherche les offres dont la date de publication est en ts supérieure
        query["created_date"] = {
            $gte: '' + correspondance[req.query["publicationDate"]]
        }
    }*/
        
    db.collection('companies').find().toArray(function (err, resultsComp) {
        companyDico = {}
        resultsComp.forEach((company) => {
            companyDico[company["_id"]] = company
        })

        db.collection('offers').find(query).toArray(function (err, results) {
            resultsFiltered = []
            results.forEach((offre) => {
                let company = companyDico[offre["id_company"]]
                offre.matchingScore = matchingModule.matchingWithUser(offre,req.body,company,filter);

                /* FILTRE AVANCE EST UN FILTRE ACTIF */

                isInFilter = true;

                /*if (Object.keys(req.query).indexOf("matchingMini") > -1) {
                    if (offre.matchingScore < req.query["matchingMini"]) {
                        isInFilter = false
                    }
                }
                if (Object.keys(companyDico).indexOf("" + offre["id_company"]) == -1) {
                    isInFilter = false
                } else {
                    if (Object.keys(req.query).indexOf("companySize") > -1 && "" + company["taille"] != "" + req.query["companySize"]) {
                        isInFilter = false;
                    }

                    if (Object.keys(req.query).indexOf("isPartner") > -1 && !company["isPartner"]) {
                        isInFilter = false;
                    }
                }*/

                if (isInFilter) {
                    resultsFiltered.push(offre)
                }
            });
            res.json(resultsFiltered);
        })
    });
});

router.get('/byCompanyId', function (req, res) {
    var id = mongoose.Types.ObjectId(req.query["id"]);

    db.collection('offers').find({
        "id_company": id
    }).toArray(function (err, results) {
        res.json(results);
    })
});


router.post('/post', function (req, res) {
    req.body.id_company = mongoose.Types.ObjectId(req.body.id_company);
    db.collection('offers').insertOne(req.body);
    db.collection('companies').findOne({
        _id: req.body.id_company
    }, function (findErr, company) {
        //On check si quelqu'un attendait une offre de ce type
        notificationModule.checkNotifForAllUsers(req.body,company)
    });
    
    
    res.send(req.body);
});

router.post('/update', function (req, res) {
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
    var id = mongoose.Types.ObjectId(req.params.id);

    db.collection('offers').remove({
        _id: id
    });
    res.send(req.body);
});


module.exports = router;