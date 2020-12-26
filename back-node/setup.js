const AvisModel = require('./models/avis.model');
const CompanyModel = require('./models/company.model');
const DomainModel = require('./models/domain.model');
const OfferModel = require('./models/offer.model');
const SectorModel = require('./models/sector.model');
const SoftSkillModel = require('./models/softSkill.model');
const UserModel = require('./models/user.model');

const config = require('./config.json');

const MongoClient = require('mongodb').MongoClient;

let client;
async function connect() {
  client = await MongoClient.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {throw new Error(400)});
  return client.db('0xpDB');
}

function applySingleSchema(db, collectionName, schema) {
  db.command({
    collMod: collectionName,
    validator: schema,
    validationLevel: 'strict'
  }).then(res => {
    console.log(`Updated ${collectionName} collection with schema :`);
    console.log(schema);
  }).catch(err => {
    console.log(err);
  });
}

connect().then(db => {
  db.collection('companies').createIndex({ "name": 1 }, { unique: true });
  db.collection('users').createIndex({ "username": 1 }, { unique: true });
  applySingleSchema(db, 'avis', AvisModel);
  //client.close();
});
