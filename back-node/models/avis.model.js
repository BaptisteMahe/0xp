AvisModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "companyId", "noteGenerale", "noteAmbiance", "noteInteret", "noteEncadrt", "description"],
        properties: {
            companyId: {
                bsonType: "objectId",
                description: "[required][objectId] Id of the company the avis is about."
            },
            noteGenerale: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "[required][int] Global note (over 5) of the avis."
            },
            noteAmbiance: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "[required][int] Note (over 5) of the ambiance."
            },
            noteInteret: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "[required][int] Note (over 5) of the interest."
            },
            noteEncadrt: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "[required][int] Note (over 5) of the coaching."
            },
            description: {
                bsonType: "string",
                description: "[required][string] Small description of the experience."
            }
        }
    }
};

module.exports = AvisModel;
