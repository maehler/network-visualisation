
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var util = require("util");
var flag = 0;
const dbPath = path.resolve("/home/jacob/Dokument/Växtprojekt/sqlserver", "ignv.db")
console.log(dbPath)
//Inititializes the database connection
function test(){
  var db = new sqlite3.Database(dbPath,(err) => {
    if (err){
      return console.error(err.message);
    }
    console.log("Connected yo");
    });
    let nodesql = 'SELECT n.id, m.m_id, n.name FROM node n inner join node_module m on m.n_id = n.id;';
    let edgesql = 'SELECT * FROM edge;';
    data =[];
    db.serialize(() => {
      db.each(nodesql, [], (err,row)=>{
        if(err){
          console.error(err.message);
        }
        data.push({"group":"nodes", "data":{"id":row.id.toString(), "name":row.name.toString(), "module":row.m_id.toString()}});
      })
      .each(edgesql, [], (err, row)=>{
        if(err){
          console.error(err.message);
        }
        data.push({"group":"edges", "data":{"id":("e"+row.id.toString()), "source":row.node1.toString(), "target":row.node2.toString()}});
      })
    });
      db.close((err) =>{
      if(err){
        return console.error(err.message);
      }
      console.log('Close the database connection.');
      console.log(data)
      return data;
  })
}
test()
