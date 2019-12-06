var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var test = require('./data')
data = test()

router.get('/', (req, res) => {
  console.log(test)
  res.json(test);
});

module.exports = router;
