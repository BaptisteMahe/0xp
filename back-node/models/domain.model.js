DomainModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "display"],
        properties: {
            display: {
                bsonType: "string",
                description: "[required][string] Displayed value representing the domain."
            }
        }
    }
};
