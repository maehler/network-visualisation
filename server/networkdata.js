var model = require('./data')
var bodyParser = require("body-parser");

function getNetwork(req, res){
  res.json(model.getNetwork());
}

function getModule(req, res){
  res.json(model.getModule(req.params.module_id));
}
module.exports.getNetwork = getNetwork;
module.exports.getModule = getModule;
