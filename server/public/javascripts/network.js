


var form = document.getElementById('module')
var input = document.getElementsByClassName('module_input')
//
// var gene = document.getElementById("gene")
// var gene_input = document.getElementById("gene_input")


async function getApi(idOrName){
  console.log(!(idOrName=='/api/module/'))
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
        selector: 'node[[degree <= 1]]',
        style: {
          'height': 3,
          'width': 3,
          'background-color': '#666',
          // 'label': 'data(id)'
        }
      },
      {
        selector: 'node[[degree >= 2]][[degree <= 9]]',
        style: {
          'height': 10,
          'width': 10,
          'background-color': '#666',
          // 'label': 'data(id)'
        }
      },
      {
        selector: 'node[[degree >= 10]]',
        style: {
          'height': 13,
          'width': 13,
          'background-color': '#666',
          // 'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#ccf',
          'curve-style':'straight',
        }
      },

      {
      selector: 'edge[?directionality]',
      style : {
        'target-arrow-color': '#ccf',
        'target-arrow-shape': 'vee'
      }
    }
    ],

    layout: {
      name: 'cose-bilkent',
      animate : 'end'
    }
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
