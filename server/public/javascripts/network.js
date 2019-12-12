


var form = document.getElementById('module')
var input = document.getElementsByClassName('module_input')

var gene = document.getElementById("gene")
var gene_input = document.getElementById("gene_input")


async function getApi(idOrName){
  if(idOrName && (!(idOrName == '/api/module/'))){
    const response = await fetch(idOrName);
    const json = await response.json();
    return json
  }else{
    const response = await fetch(`/api/`);
    const json = await response.json();
    return json
  }
}

function iniCy(json){
  // console.log(json);//debuggin reasons
  var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
    elements: json,
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style:{
          'background-color': '#666',
        }
      },{
        selector: 'node[[degree <= 1]]',
        style: {
          'height': 3,
          'width': 3,
          // 'label': 'data(id)'
        }
      },{
        selector: 'node[[degree >= 2]][[degree <= 9]]',
        style: {
          'height': 10,
          'width': 10,
          // 'label': 'data(id)'
        }
      },{
        selector: 'node[[degree >= 10]]',
        style: {
          'height': 13,
          'width': 13,
          // 'label': 'data(id)'
        }
      },{
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#88A7CA',
          'curve-style':'straight',
        }
      }, {
      selector: 'edge[?directionality]',
      style : {
        'target-arrow-color': '#88A7CA',
        'target-arrow-shape': 'vee'
      }
    },{
      selector: 'node:selected',
      style: {
        'background-color': '#A3CA88',
        'label':'data(name)',
        'color': '#fff',
        'text-outline-color': '#888',
        'text-outline-width': 3,
      },
    },
    ],

    layout: {
      name: 'cose-bilkent',
      animate : 'end'
    }
  });
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    console.log( 'tapped ' + node.id() );
  });
}
form.addEventListener('submit',function(e){
  e.preventDefault();
  getApi('/api/module/'+form[0].value).then((json)=>{
    iniCy(json);})
})

gene.addEventListener('submit',function(e){
  e.preventDefault();
  getApi('/api/gene?name='+gene[0].value).then((json)=>{
    iniCy(json);})
})
