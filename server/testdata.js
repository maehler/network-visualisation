
var sqlite3 = require("sqlite3").verbose();
var path = require('path');
var util = require("util");
var flag = 0;
const dbPath = path.resolve("/home/jacob/Dokument/Växtprojekt/sqlserver", "ignv.db")
//Inititializes the database connection
var test = class{
  constructor(dbpath){
    this.db = new sqlite3.Database( dbpath,(err)=>{
      if(err){
        console.error(err.message)
      }console.log("connected yo")
    })
  }
  select(query){
    this.db.all(query,  [], (rows, err)=> {
      if(err){
        console.error(err)
      }else{
       return rows
      }
    })
  }
  main(){
    async function reee(){
      var tost = this.select('SELECT n.id, m.m_id, n.name FROM node n inner join node_module m on m.n_id = n.id;')
      var tist = this.select('SELECT * FROM edge;')
      var tast = []
      console.log(this.tost)
    }
    reee().then(
      console.log(this.tost)
      )
  }
  close(){
    this.db.close((err)=>{
      if(err){
        console.error(err)
      }else{
        console.log("closed")
      }
    })
  }
}

const ignv = new test(dbPath)
ignv.main()
ignv.close()
