const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;
const express = require('express');
const app = express();

const OfferController = require('./controllers/OfferController');
const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');
const SelectController = require('./controllers/SelectController');
const AvisController = require('./controllers/AvisController');
const DocumentController = require('./controllers/DocumentController');
const config = require('./config.json');
const PORT = process.argv[2] || 3000;


//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// Set our routes
app.use('/offers', OfferController);
app.use('/users', UserController);
app.use('/companies', CompanyController);
app.use('/select', SelectController);
app.use('/avis', AvisController);
app.use('/documents', DocumentController);

// Handle 404
app.use(function (req, res) {
    res.status(404).send({ 
        status: 404,
        message: '404 Not Found'
    });
});

// Handle 500
app.use(function (err, req, res, next) {
    console.log("ERROR : \n", err, "\n");
    res.status(err.code || 500).json({
        message: err.message || 'internal error'
    });
});


//listen
const client = new MongoClient(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(err => {
    if (err) return console.log(err);
    db = client.db('0xpDB');
    gridFSBucket = new GridFSBucket(client.db("0xpDB"));
    let httpServer = http.createServer(app);
    httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));
});
