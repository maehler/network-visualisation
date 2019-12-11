
const db = require("better-sqlite3")("../sqlserver/ignv.db");
var util = require("util");


function pushEdges(obj, array){
  array.push({
    "group":"edges",
    "data":{
      "id":("e"+obj.id),
      "source":obj.node1,
      "target":obj.node2,
      "directionality":obj.directionality === 1}});
}

function pushNodes(obj, array){
  array.push(
    {"group":"nodes",
    "data":{
      "id":obj.id,
      "name":obj.name}});
}

var getNetwork = function(){
    edgeInsert = 'select * from edge;';
    nodeInsert = 'SELECT n.id, n.name FROM node n;';
    apiData = [];
    for(const edge of db.prepare(edgeInsert).iterate()){
      pushEdges(edge, apiData)
    }
    for(const node of db.prepare(nodeInsert).iterate()){
      pushNodes(node, apiData)
    }
    return apiData;
  }
function getModule(moduleId) {
      var nodeInsert = "SELECT id, name FROM node INNER JOIN node_module ON node_module.n_id = node.id WHERE node_module.m_id = ?";

      var apiData = [];
      var nodeId = [];
      for (const node of db.prepare(nodeInsert).iterate(moduleId)) {
          nodeId.push(node.id);
          pushNodes(node, apiData);
      }

      var qMarks = ""
      for (nId in nodeId) {
          qMarks += "?,";
      }
      qMarks = qMarks.replace(/,$/, "");

      var edgeInsert = `SELECT id, node1, node2, directionality FROM edge WHERE node1 IN (${qMarks}) AND node2 IN (${qMarks})`;
      for (const edge of db.prepare(edgeInsert).iterate(...nodeId, ...nodeId)) {
          pushEdges(edge, apiData)
      }

      return apiData;
  }

function getSingleGene(name){
  var apiData =[];
  var nodeIds =[];
  var qMarks = ''
  var edgeInsert = 'SELECT * FROM edge WHERE node1 = ?';
  var getNodeId = "SELECT id FROM node WHERE name = ?";

  for (const node of db.prepare(getNodeId).iterate(name)){
    var id = node;
  }
  nodeIds.push(id.id)
  for (const edge of db.prepare(edgeInsert).iterate(id.id)){
    pushEdges(edge, apiData);
    nodeIds.push(edge.node2)
  }
  for(nodeId in nodeIds){
    qMarks += "?,"
  }
  qMarks = qMarks.replace(/,$/, "");

  var nodeInserts = `SELECT * FROM node WHERE id IN (${qMarks})`
  for(const nodes of db.prepare(nodeInserts).iterate(...nodeIds)){
    pushNodes(nodes, apiData);
  }
  return apiData;
}

module.exports.getSingleGene = getSingleGene;
module.exports.getNetwork = getNetwork;
module.exports.getModule = getModule;
