var express = require('express');
var router = express.Router();
var controller = require('../networkdata.js')
var bodyParser = require("body-parser");
var cors = require("corser");

console.log(controller.getNetwork, controller.getModule)

router.get('/', controller.getNetwork);

router.get('/module/:module_id', controller.getModule)

router.get('/gene', controller.getSingleGene)
module.exports = router;
