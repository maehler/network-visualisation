
async function test(){
  const response = await fetch("/api/module/1");
  const json = await response.json();
  return json
}
test().then(json =>{
  console.log(json);//debuggin reasons
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
          'label': 'data(id)'
        }
      },
      {
        selector: 'node[[degree >= 2]][[degree <= 9]]',
        style: {
          'height': 15,
          'width': 15,
          'background-color': '#666',
          'label': 'data(id)'
        }
      },
      {
        selector: 'node[[degree >= 10]]',
        style: {
          'height': 30,
          'width': 30,
          'background-color': '#666',
          'label': 'data(id)'
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
      name: 'concentric',
    }
  });
  console.log('test')

})
