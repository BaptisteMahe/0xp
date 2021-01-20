UserStudentModel = {
    bsonType: "object",
    required: ["_id", "username", "hash", "type", "firstName", "name", "email"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: "objectId",
        },
        username: {
            bsonType: "string",
            description: "[required][string] User's username."
        },
        hash: {
            bsonType: "string",
            description: "[required][string] User's hash of the password."
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
        email: {
            bsonType: "string",
            description: "[required][string] User's email."
        },
        telephone: {
            bsonType: "string",
            description: "[optional][string] User's telephone number."
        }
    }
};

UserCompanyModel = {
    bsonType: "object",
    required: ["_id", "username", "hash", "type", "companyId", "email"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: "objectId",
        },
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
        companyId: {
            bsonType: "objectId",
            description: "[required][objectId] User's related company's id."
        },
        email: {
            bsonType: "string",
            description: "[required][string] User's email."
        },
        telephone: {
            bsonType: "string",
            description: "[optional][string] User's telephone number."
        }
    }
};

UserAdminModel = {
    bsonType: "object",
    required: ["_id", "username", "hash", "type"],
    additionalProperties: false,
    properties: {
        _id: {
            bsonType: "objectId",
        },
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
};

module.exports = { UserStudentModel, UserCompanyModel, UserAdminModel };
