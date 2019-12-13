


var form = document.getElementById('module')

var gene = document.getElementById('gene')

var search = document.getElementById("search")


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
  // cy.nodes().forEach(function(n){
  //     var g = n.data('name');
  //     var $links = [
  //       {
  //       name: 'arabidopsis.org',
  //       url: 'https://www.arabidopsis.org/servlets/TairObject?name='+g+'&type=locus'
  //       }
  //     ]
  //     console.log($links)
  // });
  search.addEventListener('submit',function(e){
    e.preventDefault();
    var gName = search.elements['search_input'].value
    cy.nodes(`node[name= "${gName}"]`).select()
  })
}

form.addEventListener('submit',function(e){
  e.preventDefault();
  var formVal = form.elements['module_input'].value
  getApi('/api/module/'+formVal).then((json)=>{
    iniCy(json);})
})

gene.addEventListener('submit',function(e){
  e.preventDefault();
  var gene_query = gene.elements['gene_input'].value
  getApi('/api/gene?name='+gene_query).then((json)=>{
    iniCy(json);})
})
