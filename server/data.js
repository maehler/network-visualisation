
const db = require("better-sqlite3")("../sqlserver/ignv.db");
var util = require("util");

// Inititializes the database connection
var getNetwork = function(){
    edgeinsert = 'select * from edge;';
    nodeinsert = 'SELECT n.id, m.m_id, n.name FROM node n inner join node_module m on m.n_id = n.id;';
    apidata = [];
    for(const edge of db.prepare(edgeinsert).iterate()){
      apidata.push({
        "group":"edges",
        "data":{
          "id":("e"+edge.id),
          "source":edge.node1,
          "target":edge.node2}});
    }
    for(const node of db.prepare(nodeinsert).iterate()){
      apidata.push(
        {"group":"nodes",
        "data":{
          "id":node.id,
          "name":node.name,
          "module":node.m_id}});
    }
    return apidata;
  }

module.exports.getNetwork = getNetwork;
