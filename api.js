var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var apidata = require('./apidata')

console.log(apidata)
router.get('/', (req, res) => {
    res.send(apidata);
});


module.exports = router;
