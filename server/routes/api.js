var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var apidata = require('./data')

router.get('/', (req, res) => {
  res.json(apidata.data);
});
router.get('/:module', (req, res)=>{
   res.json(apidata.data.filter(modules => modules.data.module === req.params.module))
})
module.exports = router;
