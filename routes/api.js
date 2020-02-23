var express = require('express');
var router = express.Router();
var networkController = require('../controller/network.js')

// console.log(controller.getNetwork, controller.getModule, controller.getOnlyModules)

router.get('/', networkController.getNetwork);

router.get('/module/:module_id', networkController.getModule)

router.get('/gene', networkController.getSingleGene)

router.get('/modules', networkController.getOnlyModules)

router.get('/genes', networkController.getOnlyGenes)
module.exports = router;
