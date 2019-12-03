var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var data = require('./data')

router.get('/', (req, res) => {res.json(data.data)});

/*router.get('/:id', (req, res)=>{
  res.json(apidata.id);
})*/
module.exports = router;
