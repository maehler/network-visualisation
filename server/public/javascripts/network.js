


var form = document.getElementById('form')
var input = document.getElementsByClassName('input')



async function getApi(module_id){
  if(module_id){
    const response = await fetch(`/api/module/${module_id}`);
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
        selector: 'node[[degree = 1]]',
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
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
    ],

    layout: {
      name: 'cose',
      animationduration: 1000
    }
  });
}
form.addEventListener('submit',function(e){
  e.preventDefault();
  // console.log(form[0]);
  getApi(form[0].value).then((json)=>{iniCy(json);})
})
// btn.addEventListener('click', function(){getApi("1").then((json)=>{iniCy(json);})})
