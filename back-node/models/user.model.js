UserStudentModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "username", "hash", "type", "firstName", "name"],
        properties: {
            username: {
                bsonType: "string",
                description: "[required][string] User's username."
            },
            hash: {
                bsonType: "string",
                description: "[required][string] UUser's hash of the password."
            },
            type: {
                enum: ["student"],
                description: "[required][string][enum] User's type between 'student', 'company' and 'admin'."
            },
            firstName: {
                bsonType: "string",
                description: "[required][string] User's first name."
            },
            name: {
                bsonType: "string",
                description: "[required][string] User's last name."
            },
            softSkills: {
                bsonType: "array",
                description: "[optional][object] Array of user's soft skills",
                uniqueItems: true,
                items: {
                    bsonType: "object",
                    required: [ "_id", "display"],
                    properties: {
                        _id:{
                            bsonType: "objectId"
                        },
                        display: {
                            bsonType: "string",
                            description: "[required][string] Displayed value representing the soft skill."
                        }
                    }
                }
            },
            telephone: {
                bsonType: "string",
                description: "[optional][string] User's telephone number."
            },
            email: {
                bsonType: "string",
                description: "[optional][string] User's email."
            }
        }
    }
};

UserCompanyModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "username", "hash", "type", "firstName", "name", "companyId"],
        properties: {
            username: {
                bsonType: "string",
                description: "[required][string] User's username."
            },
            hash: {
                bsonType: "string",
                description: "[required][string] UUser's hash of the password."
            },
            type: {
                enum: ["company"],
                description: "[required][string][enum] User's type between 'student', 'company' and 'admin'."
            },
            firstName: {
                bsonType: "string",
                description: "[required][string] User's first name."
            },
            name: {
                bsonType: "string",
                description: "[required][string] User's last name."
            },
            companyId: {
                bsonType: "objectId",
                description: "[required][objectId] User's related company's id."
            },
            telephone: {
                bsonType: "string",
                description: "[optional][string] User's telephone number."
            },
            email: {
                bsonType: "string",
                description: "[optional][string] User's email."
            }
        }
    }
};

UserAdminModel = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "username", "hash", "type"],
        properties: {
            username: {
                bsonType: "string",
                description: "[required][string] User's username."
            },
            hash: {
                bsonType: "string",
                description: "[required][string] UUser's hash of the password."
            },
            type: {
                enum: ["admin"],
                description: "[required][string][enum] User's type between 'student', 'company' and 'admin'."
            }
        }
    }
};
