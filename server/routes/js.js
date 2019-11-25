var express = require('express');
var router = express.Router();

router.get('/cytoscape.min.js', function(req, res, next) {
  res.sendFile('node_modules/cytoscape/dist/cytoscape.min.js', {root: '.'})
});

module.exports = router;
