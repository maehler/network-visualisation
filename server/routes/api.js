var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var apidata = require('./apidata')

router.get('/', (req, res) => {res.json(apidata)});

/*router.get('/:id', (req, res)=>{
  res.json(apidata.id);
})*/
module.exports = router;
