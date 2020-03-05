var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/niklas', function(req, res, next) {
  res.send('hej niklas');
});

router.get('/network', function(req, res, next) {
  console.log(req);
  res.send({name: 'seedtransnet', nodes: [], edges: [], type: req.query.type});
});

module.exports = router;
