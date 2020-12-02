let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let mongoose = require('mongoose');

let notificationModule = require('../modules/notificationModule.js')
let matchingModule = require('../modules/matchingModule.js')

const escapeStringRegexp = require('escape-string-regexp')

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
    let query = { };
    let filter = req.query;
    if (Object.keys(req.query).indexOf("type") > -1) {
        query["type"] = new RegExp('^' + escapeStringRegexp(req.query["type"]) + '$', 'i');
    }
    if (Object.keys(req.query).indexOf("duration") > -1) {
        query["duration"] = new RegExp('^' + escapeStringRegexp(req.query["duration"]) + '$', 'i');
    }
    if (Object.keys(req.query).indexOf("sector") > -1) {
        query["sector"] = new RegExp('^' + escapeStringRegexp(req.query["sector"]) + '$', 'i');
    }

    /* FILTRES AVANCÉS */

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
        //On cherche les offres dont la date de publication est en ts supÃ©rieure
        query["created_date"] = {
            $gte: '' + correspondance[req.query["publicationDate"]]
        }
    }*/

    db.collection('companies').find().toArray(function (err, resultsComp) {
        let companyDico = {};
        resultsComp.forEach((company) => {
            companyDico[company["_id"]] = company;
        });

        db.collection('offers').find(query).toArray(function (err, results) {
            let resultsFiltered = [];
            results.forEach((offre) => {
                let company = companyDico[offre["id_company"]];
                offre.company = company.name;
                offre.srcImgCompany = company.srcImage;
                offre.matchingScore = matchingModule.matchingWithUser(offre, req.body, company, filter);

                /* FILTRES AVANCÉS */

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

                let isInFilter = true;

                if(Object.keys(req.query).indexOf("textinput") > -1){
                    let textInput = req.query["textinput"];
                    if (!offre["title"].includes(textInput) && !offre["company"].includes(textInput) && !offre["type"].includes(textInput) && !offre["sector"].includes(textInput)){
                        let domainContain = false;
                        offre["domains"].forEach((domain) => {
                            // TODO : Check the issue with the (new?) kind of domains being object and not strings
                            if (typeof domain === "string" && domain.includes(textInput)){
                                domainContain = true;
                            }
                        })
                        if (!domainContain){
                            isInFilter = false;
                        }
                    }
                }
                if (isInFilter) {
                    resultsFiltered.push(offre);
                }
            });
            res.json(resultsFiltered);
        })
    });
});

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
