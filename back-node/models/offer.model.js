OfferModel = {
    $jsonSchema: {
        bsonType: "object",
        required: ["_id", "title", "type", "description", "location", "duration", "studentTypes", "startDate", "domains", "sector", "company", "createdDate", "isValidated"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId",
            },
            title: {
                bsonType: "string",
                description: "[required][string] Offer's title."
            },
            type: {
                enum: ["Stage", "Alternance", "VIE", "CDI", "CDD"],
                description: "[required][enum] Offer's type between 'Stage', 'Alternance', 'VIE', 'CDI', 'CDD'."
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
                enum: ["1-2 mois", "2-3 mois", "4-6 mois", "1-2 ans", "CDI"],
                description: "[required][enum] Experience's time duration."
            },
            studentTypes:{
                bsonType: "array",
                description: "[required][array] Array student profile desired for the offer.",
                uniqueItems: true,
                items: {
                    enum: ["1A", "2A", "3A", "3A+"],
                    description: "[required][enum] String describing student's profile between '1A', '2A', '3A' and '3A+'."
                }
            },
            startDate: {
                bsonType: "date",
                description: "[required][date] The date when the experience start."
            },
            remuneration: {
                bsonType: "int",
                description: "[optional][int] The date when the experience start."
            },
            pdfId: {
                bsonType: "objectId",
                description: "[optional][objectId] The Id referring to PDF's offer."
            },
            domains : {
                bsonType: "array",
                description: "[required][array] Array of domains concerning the offer.",
                uniqueItems: true,
                items: {
                    bsonType: "object",
                    required: [ "_id", "display"],
                    additionalProperties: false,
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
            sector: {
                bsonType: "object",
                description: "[required][object] Sector of the company offering the offer.",
                required: [ "_id", "display"],
                additionalProperties: false,
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
                required: [ "_id", "display", "isPartner"],
                additionalProperties: false,
                properties: {
                    _id: {
                        bsonType: "objectId",
                        description: "[required][string] Id of the company offering the offer."
                    },
                    display: {
                        bsonType: "string",
                        description: "[required][string] Name of the company offering the offer."
                    },
                    isPartner: {
                        bsonType: "bool",
                        description: "[required][boolean] If the company offering the offer is partner with ECM or not"
                    },
                    srcImg: {
                        bsonType: "string",
                        description: "[optional][string] Link to the logo of the company offering the offer."
                    }
                }
            },
            createdDate: {
                bsonType: "date",
                description: "[required][date] Date when the offer was published."
            },
            isValidated: {
                bsonType: "bool",
                description: "[required][boolean] If the offer has been validated by admin"
            }
        }
    }
};

module.exports = OfferModel;
