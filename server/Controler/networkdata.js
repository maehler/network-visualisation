var model = require('../Model/data')
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


module.exports.getSingleGene = getSingleGene;
module.exports.getNetwork = getNetwork;
module.exports.getModule = getModule;
