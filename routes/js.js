var express = require('express');
var router = express.Router();

router.get('/cytoscape.min.js', function(req, res, next) {
  res.sendFile('node_modules/cytoscape/dist/cytoscape.min.js', {root: '.'});
});

router.get('/cytoscape-cose-bilkent.js', function(req, res, next) {
  res.sendFile('node_modules/cytoscape-cose-bilkent/cytoscape-cose-bilkent.js', {root: '.'});
});

router.get('/tippy.css', function(req, res, next) {
  res.sendFile('node_modules/tippy.js/dist/tippy.css', {root: '.'});
});

router.get('/jquery.min.js', function(req, res, next) {
  res.sendFile('node_modules/jquery/dist/jquery.min.js', {root: '.'});
});

router.get('/bloodhound.min.js', function(req,res, next) {
  res.sendFile('node_modules/typeahead.js/dist/bloodhound.min.js', {root: '.'});
});

router.get('/typeahead.jquery.min.js', function(req, res, next) {
  res.sendFile('node_modules/typeahead.js/dist/typeahead.jquery.min.js', {root: '.'});
});

router.get('/cytoscape-graphml.js', function(req, res, next) {
  res.sendFile('node_modules/cytoscape-graphml/cytoscape-graphml.js', {root: '.'});
});

module.exports = router;
