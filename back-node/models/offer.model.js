OfferModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "title", "type", "description", "location", "duration", "startDate", "domains", "softSkills", "sector", "company", "createdDate"],
        properties: {
            title: {
                bsonType: "string",
                description: "[required][string] Offer's title."
            },
            type: {
                enum: ["Stage", "Alternance", "Premier Emploi"],
                description: "[required][enum] Offer's type between 'Stage', 'Alternance' and 'Premier Emploi'."
            },
            description: {
                bsonType: "string",
                description: "[required][string] Offer's description."
            },
            location: {
                bsonType: "string",
                description: "[required][string] Location where the experience will take place."
            },
            duration: {
                enum: ["1-2 mois", "6 mois", "2 ans"],
                description: "[required][enum] Experience's time duration."
            },
            startDate: {
                bsonType: "date",
                description: "[required][date] The date when the experience start."
            },
            remuneration: {
                bsonType: "int",
                description: "[optional][int] The date when the experience start."
            },
            domains : {
                bsonType: "array",
                description: "[required][array] Array of domains concerning the offer.",
                uniqueItems: true,
                items: {
                    bsonType: "object",
                    required: [ "_id", "display"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        display: {
                            bsonType: "string",
                            description: "[required][string] Displayed value representing the domain."
                        }
                    }
                }
            },
            softSkills : {
                bsonType: "array",
                description: "[required][array] Array of softSkills required by the offer.",
                uniqueItems: true,
                items: {
                    bsonType: "object",
                    required: [ "_id", "display"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        display: {
                            bsonType: "string",
                            description: "[required][string] Displayed value representing the soft skill."
                        }
                    }
                }
            },
            sector: {
                bsonType: "object",
                description: "[required][object] Sector of the company offering the offer.",
                required: [ "_id", "display"],
                properties: {
                    _id: {
                        bsonType: "objectId"
                    },
                    display: {
                        bsonType: "string",
                        description: "[required][string] Displayed value representing the sector."
                    }
                }
            },
            company: {
                bsonType: "object",
                description: "[required][string] Information about the company offering the offer.",
                required: [ "_id", "display"],
                properties: {
                    _id: {
                        bsonType: "objectId",
                        description: "[required][string] Id of the company offering the offer."
                    },
                    display : {
                        bsonType: "string",
                        description: "[required][string] Name of the company offering the offer."
                    },
                    srcImgCompany: {
                        bsonType: "string",
                        description: "[optional][string] Link to the logo of the company offering the offer."
                    }
                }
            },
            createdDate: {
                bsonType: "date",
                description: "[required][date] Date when the offer was published."
            }
        }
    }
};

module.exports = OfferModel;
