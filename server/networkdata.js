var model = require('./data')


function getNetwork(req, res){
  res.json(model.getNetwork());
}

module.exports.getNetwork = getNetwork
