var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("corser");
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
//const dbPath = "~/home/jacob/Dokument/Växtprojekt/sqlserver/ignv.db";
const dbPath = path.resolve("/home/jacob/Dokument/Växtprojekt/sqlserver", "ignv.db")

//Inititializes the database connection
var db = new sqlite3.Database(dbPath,(err) => {
  if (err){
    return console.error(err.message);
  }
  console.log("connected yo");
});
let sql = 'SELECT n.id, n.name, e.node2 FROM node n INNER JOIN edge e ON	n.id = e.node1;';
data =[]
db.all(sql, [], (err,rows) => {
  if(err){
    console.error(err.message);
  }
  rows.forEach((row)=>{
    data.push(row);
  });
});

db.close((err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Close the database connection.');
})
// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    return res.send(Object.values(data));
});

module.exports = router;
