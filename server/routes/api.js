var express = require('express');
var router = express.Router();
var controller = require('../networkdata.js')
var bodyParser = require("body-parser");
var cors = require("corser");



router.get('/network', controller.getNetwork);

module.exports = router;
