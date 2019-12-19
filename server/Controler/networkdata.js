var model = require('../model/data')
var bodyParser = require("body-parser");



function getNetwork(req, res){
  res.json(model.getNetwork());
}

function getModule(req, res){
  res.json(model.getModule(req.params.module_id));
}

function getSingleGene(req, res){
  res.json(model.getSingleGene(req.query.name));
}

function getOnlyModules(req, res){
  res.json(model.getOnlyModules());
}

function getOnlyGenes(req, res){
  res.json(model.getOnlyGenes());
}



module.exports.getSingleGene = getSingleGene;
module.exports.getNetwork = getNetwork;
module.exports.getModule = getModule;
module.exports.getOnlyModules = getOnlyModules;
module.exports.getOnlyGenes = getOnlyGenes;
