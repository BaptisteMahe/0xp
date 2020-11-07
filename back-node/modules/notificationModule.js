const ObjectId = require('mongodb').ObjectId;
var matchingModule = require('../modules/matchingModule.js')

module.exports = {
    checkNotifForAllUsers: function (bodyOffer, company) {
        //Pour chaque user on va chercher son filtrage
        db.collection('users').find().toArray(function (err, results) {
            results.forEach((user) => {
                //Si pas de filtrage on passe sinon on regarde si l'offre est dans le filtrage
                if (user["filterAlert"]) {
                    isInFilter = checkIfOfferInFilter(user["filterAlert"], bodyOffer, company);
                    if (isInFilter) {
                        console.log("ADD Notification for user named "+user["username"])
                        //Si elle l'est on ajoute la notif à l'user
                        notificationsList = user["notifications"] ? user["notifications"] : [];
                        notificationsList.push({
                            "type": "filterNotif",
                            "ts": new Date().getTime()
                        })
                        db.collection('users').update({
                            _id: ObjectId(user["_id"])
                        }, {
                            $set: {
                                notifications: notificationsList,
                            }
                        })
                    }
                }
            })
        })
    }
}

function checkIfOfferInFilter(filterJson, offer, company) {
    isOfferInFilter = true;
    if (Object.keys(filterJson).indexOf("type") > -1 && offer["type"] != filterJson["type"]) {
        isOfferInFilter = false;
        console.log("Type is wrong")
    } else if (Object.keys(filterJson).indexOf("duration") > -1 && offer["duration"] != filterJson["duration"]) {
        isOfferInFilter = false;
        console.log("duration is wrong")
    } else if (Object.keys(filterJson).indexOf("sector") > -1 && offer["sector"] != filterJson["sector"]) {
        isOfferInFilter = false;
        console.log("sector is wrong")
    } else if (Object.keys(filterJson).indexOf("start_date") > -1 && offer["start_date"] < filterJson["start_date"]) {
        isOfferInFilter = false;
        console.log("start_date is wrong")
    } else if (Object.keys(filterJson).indexOf("remunMini") > -1 && offer["remuneration"] < filterJson["remunMini"]) {
        isOfferInFilter = false;
        console.log("remuneration is wrong")
    } else if (Object.keys(filterJson).indexOf("location") > -1 && filterJson["location"].length != 0 && filterJson["location"].indexOf(offer["location"]) == -1) {
        console.log("location is wrong")
        isOfferInFilter = false;
    } else if (Object.keys(filterJson).indexOf("company") > -1 && filterJson["company"].length != 0 && filterJson["company"].indexOf(offer["company"]) == -1) {
        console.log("company is wrong")
        isOfferInFilter = false;
    } else if (Object.keys(filterJson).indexOf("matchingMini") > -1 && matchingModule.matchingWithUser(offer) < filterJson["matchingMini"]) {
        console.log("matchingMini is wrong")
        isOfferInFilter = false;
    } else if (Object.keys(filterJson).indexOf("companySize") > -1 && filterJson["companySize"] && (company["taille"] != filterJson["companySize"])) {
        console.log("companySize is wrong")
        isOfferInFilter = false;
    } else if (Object.keys(filterJson).indexOf("isPartner") > -1 && filterJson["isPartner"] && !company["isPartner"]) {
        console.log("isPartner is wrong")
        isOfferInFilter = false;
    }
    return isOfferInFilter;
}
    /*
    if(Object.keys(req.query).indexOf("company")>-1){
        companies=req.query["company"].split(";")
        companies.splice(-1,1)
        query["company"] = { $in: companies }
    }
    
    const promise = new Promise(function(resolve, reject) {
        if(Object.keys(req.query).indexOf("companySize")>-1 || Object.keys(req.query).indexOf("isPartner")>-1){
            db.collection('companies').find().toArray(function(err, resultsComp) {
                resolve(resultsComp);
            })
        } else{
            resolve([])
        }
    });

    promise.then(function(resultsComp) {
        companyDico={}
        resultsComp.forEach((company) => {
            companyDico[company["_id"]]=company
        })

        db.collection('offers').find(query).toArray(function(err, results) {
            expandWithMatching(results);
            resultsFiltered=[]
            results.forEach((offre)=>{
                isInFilter=true;
                if(Object.keys(req.query).indexOf("matchingMini")>-1){
                    if (offre.matchingScore<req.query["matchingMini"]){
                        isInFilter=false
                    }
                }
                if(Object.keys(req.query).indexOf("companySize")>-1 || Object.keys(req.query).indexOf("isPartner")>-1){
                    if (Object.keys(companyDico).indexOf(""+offre["id_company"])==-1){
                        isInFilter=false
                    } else{
                        company = companyDico[offre["id_company"]]
                        if(Object.keys(req.query).indexOf("companySize")>-1 && ""+company["taille"]!=""+req.query["companySize"]){
                            isInFilter=false;
                        }

                        if(Object.keys(req.query).indexOf("isPartner")>-1 && !company["isPartner"]){
                            isInFilter=false;
                        }
                    }
                }

                if (isInFilter){
                    resultsFiltered.push(offre)
                }
            });
            res.json(resultsFiltered);
        })
    });*/
