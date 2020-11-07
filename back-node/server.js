let express = require('express');
let app = express();
let http = require('http');
let PORT = process.argv[2];

const MongoClient = require('mongodb').MongoClient;

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// custom routes
let OffreController = require('./controllers/OffreController');
let UserController = require('./controllers/UserController');
let CompanyController = require('./controllers/CompanyController');
let SelectController = require('./controllers/SelectController');
let AvisController = require('./controllers/AvisController');

// Set our routes
app.use('/offres', OffreController);
app.use('/users', UserController);
app.use('/companies', CompanyController);
app.use('/select', SelectController);
app.use('/avis', AvisController);

// Handle 404
app.use(function (req, res) {
    res.status(404).send({
        status: 404,
        message: '404 Not Found',
        type: 'client'
    });
});

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500).send({
        status: 500,
        message: 'internal error',
        type: 'internal'
    });
});

//listen
const uri = "mongodb+srv://admin0xp:mdpadmin0xp@0xp-aqxy3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    if (err) return console.log(err);
    db = client.db('0xpDB');
    let httpServer = http.createServer(app);
    httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));
});
