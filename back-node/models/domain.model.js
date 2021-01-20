DomainModel = {
    $jsonSchema: {
        bsonType: "object",
        required: ["_id", "display"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId",
            },
            display: {
                bsonType: "string",
                description: "[required][string] Displayed value representing the domain."
            }
        }
    }
};

module.exports = DomainModel;
