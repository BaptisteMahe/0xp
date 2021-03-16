CompanyModel = {
    $jsonSchema: {
        bsonType: "object",
        required: ["_id", "name", "contact", "isPartner"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId",
            },
            name: {
                bsonType: "string",
                description: "[required][string] Company's name."
            },
            description: {
                bsonType: "string",
                description: "[optional][string] Company's description."
            },
            location: {
                bsonType: "string",
                description: "[optional][string] Company's location."
            },
            srcImage: {
                bsonType: "string",
                description: "[optional][string] Link to the company's logo."
            },
            contact: {
                bsonType: "string",
                description: "[required][string] Company's email contact."
            },
            category: {
                enum: ["TPE", "PME", "ETI", "GE"],
                description: "[optional][enum] Company's category between 'TPE', 'PME', 'ETI' and 'GE'."
            },
            isPartner: {
                bsonType: "bool",
                description: "[required][bool] Boolean representing if the company is partner with ECM or not."
            },
            websiteUrl: {
                bsonType: "string",
                description: "[optional][string] Company's website url."
            }
        }
    }
};

module.exports = CompanyModel;
