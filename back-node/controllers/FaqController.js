let fs = require('fs');
let express = require('express');
let router = express.Router();


router.get('/', function (req, res, next) {
    let faq = JSON.parse(fs.readFileSync('./FAQ.json'));
    res.json(faq);
});


module.exports = router;