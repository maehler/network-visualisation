var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var util = require("util");
var flag = 0;
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
    apidata =[]
    for(var i=0, row; row = rows[i]; i++){
      //Loops through all the rows of data, saving distinct ids
      flag = 0;
      if(apidata.length == 0){//If the apidata is empty, add the first object
        apidata =[{"id":row["id"],"name":row["name"],"node2":[row["node2"]]}]
        console.log(apidata)
      }else{
        for (var j = 0, apiItem; apiItem = apidata[j]; j++){
          /*
            Identifies matching id's. If there is a matching id, it appends
            node edges.
          */
          if(row.id == apiItem.id){
            if(!(row["node2"] == apiItem['node2'])){
              apidata[j]["node2"].push(row["node2"]);
              flag = 1;
              break
            }else if(apidata.length == i-1){
              flag = 1;
              break;
            }
          }
        }
        if (flag !=1){//If there are no mathcing id's, it add this new id
          apidata.push({"id":row["id"],"name":row["name"],"node2":[row["node2"]]});
        }
      }
    };
  });

db.close((err) =>{
  if(err){
    return console.error(err.message);
  }
  console.log('Close the database connection.');
  module.exports.apidata = apidata
  
})
