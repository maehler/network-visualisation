
async function test(){
  const response = await fetch("/api");
  const json = await response.json();
  return json
}
test().then(json =>{
  console.log(json);
  var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
    elements: json,
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
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

})
