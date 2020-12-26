const config = require('./config.json');
let express = require('express');
let app = express();
let http = require('http');
let PORT = process.argv[2] || 3000;

const MongoClient = require('mongodb').MongoClient;

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// custom routes
let OfferController = require('./controllers/OfferController');
let UserController = require('./controllers/UserController');
let CompanyController = require('./controllers/CompanyController');
let SelectController = require('./controllers/SelectController');
let AvisController = require('./controllers/AvisController');

// Set our routes
app.use('/offres', OfferController);
app.use('/users', UserController);
app.use('/companies', CompanyController);
app.use('/select', SelectController);
app.use('/avis', AvisController);

// Handle 404
app.use(function (req, res) {
    res.status(404).send({ 
        status: 404,
        message: '404 Not Found'
    });
});

// Handle 500
app.use(function (err, req, res) {
    console.log("ERROR : \n", err, "\n")
    res.status(err.code || 500).json({
        message: err.message || 'internal error'
    })
});

//listen
const uri = config.mongoUri;
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    if (err) return console.log(err);
    db = client.db('0xpDB');
    let httpServer = http.createServer(app);
    httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));
});
