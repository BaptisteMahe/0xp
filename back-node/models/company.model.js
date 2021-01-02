CompanyModel = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "description", "location", "contact", "size", "isPartner"],
        properties: {
            name: {
                bsonType: "string",
                description: "[required][string] Company's name."
            },
            description: {
                bsonType: "string",
                description: "[required][string] Company's description."
            },
            location: {
                bsonType: "string",
                description: "[required][string] Company's location."
            },
            srcImage: {
                bsonType: "string",
                description: "[optional][string] Link to the company's logo."
            },
            contact: {
                bsonType: "string",
                description: "[required][string] Company's email contact."
            },
            size: {
                enum: ["1-10", "10-100", "100-1000", "1000+"],
                description: "[required][enum] Company's size in number of employees between '0-10', '10-100', '100-1000' and '1000+'."
            },
            isPartner: {
                bsonType: "bool",
                description: "[required][bool] Boolean representing if the company is partner with ECM or not."
            },
            creationDate: {
                bsonType: "date",
                description: "[optional][date] Company's date of creation."
            }
        }
    }
};

module.exports = CompanyModel;
