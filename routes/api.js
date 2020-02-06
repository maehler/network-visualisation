var express = require('express');
var router = express.Router();
var controller = require('../Controler/networkdata.js')
var bodyParser = require("body-parser");
var cors = require("corser");

// console.log(controller.getNetwork, controller.getModule, controller.getOnlyModules)

router.get('/', controller.getNetwork);

router.get('/module/:module_id', controller.getModule)

router.get('/gene', controller.getSingleGene)

router.get('/modules', controller.getOnlyModules)

router.get('/genes', controller.getOnlyGenes)
module.exports = router;
