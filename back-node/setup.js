let express = require('express');
let app = express()

const MongoClient = require('mongodb').MongoClient;

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//listen
const uri = "mongodb+srv://admin0xp:mdpadmin0xp@0xp-aqxy3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    if (err) return console.log(err);
    db = client.db('0xpDB');
    setup(db)
    console.log("done")
});

let setup = (db) => {
    // TODO enter all the setup to generate the mongodb instance
    // create collections
    // apply validators
    db.collection('companies').createIndex({"name": 1},{unique: true})
}