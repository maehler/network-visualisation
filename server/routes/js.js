var express = require('express');
var router = express.Router();

router.get('/cytoscape.min.js', function(req, res, next) {
  res.sendFile('node_modules/cytoscape/dist/cytoscape.min.js', {root: '.'})
});

router.get('/cytoscape-cose-bilkent.js', function(req, res ,next){
  res.sendFile('node_modules/cytoscape-cose-bilkent/cytoscape-cose-bilkent.js', {root: '.'})
})
module.exports = router;
