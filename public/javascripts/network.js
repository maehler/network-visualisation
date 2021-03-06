const form = document.getElementById('module-form')

const gene = document.getElementById('gene-form')

const search = document.getElementById('search-form')

const checkbox = document.getElementById('checkbox');

const checkbox2 = document.getElementById('checkbox2');

const sizeReset = document.getElementById('sizeReset');

const go = document.getElementById('GO-form');

const size = document.getElementById('size')

const spinner = document.getElementById('network-spinner')

const save = document.getElementById('save')

const colorReset = document.getElementById('colorReset')

const documentation = document.getElementById('documentation')

const enrich = document.getElementById('enrich')

const modal = document.getElementById('myModal');

const span = document.getElementsByClassName('close')[0];

function setMessage(msg, msgType) {
  var parentDiv = document.getElementById('user-alert');
  var div = document.createElement('div');

  div.classList = `alert alert-${msgType}`;
  div.appendChild(document.createTextNode(msg));
  parentDiv.appendChild(div);

  div.onanimationend = (e) => {
    if (e.srcElement.classList.contains('fade-out')) {
      parentDiv.removeChild(e.srcElement);
    }
  };

  setTimeout(() => {
    div.classList.add('fade-out');
  }, 2000);
}

var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'border-color': 'black',
        'label': 'data(name)',
        'font-size': 4,
        'color': '#fff',
        'text-outline-color': '#888',
        'text-outline-width': 1,
        'text-valign': 'top',
        'text-halign': 'center',
        'border-width': '1',
        'border-color': 'black',
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 1,
        'curve-style': 'unbundled-bezier',
        'control-point-distance': '35px',
        'control-point-weight': '0.5',
        'edge-distances': 'node-position',
        'control-point-step-size': '10px',
        'opacity': '0.4',
        'line-color': '#88A7CA',
        'overlay-padding': '3px'

      }
    },
    {
      selector: 'node',
      style: {
        'height': '10',
        'width': '10'
      }
    },
    {
      selector: 'node[[degree>=3]]',
      style: {
        'height': '10',
        'width': '10',
      }
    },
    {
      selector: 'node[[degree>=5]]',
      style: {
        'height': '14',
        'width': '14',
      }
    },
    {
      selector: 'edge[?directionality]',
      style : {
        'target-arrow-color': '#88A7CA',
        'target-arrow-shape': 'vee'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'font-size': 10,
        'text-outline-width': 3,
        'text-valign': 'top',
      },
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': 'red',
      },
    },
    {
      selector: 'node[module]',
      style: {
        'background-color': '#FFF'
      }
    },
  ]
});

function makeTippy(node) {
  var ref = node.popperRef();
  var dummyDiv = document.createElement('div');

  var tip = tippy(dummyDiv, {
    onCreate: instance => {
      instance.popperInstance.reference = ref;
    },
    lazy: false,
    trigger: 'manual',
    content: () => {
      let gene = node.data().name;
      let links = [
        {
          name: 'Arabidopsis.org',
          url: `https://www.arabidopsis.org/servlets/TairObject?name=${gene}&type=locus`
        }, {
          name: 'Uniprot search',
          url : `https://www.uniprot.org/uniprot/?query=${gene}&sort=score`
        }, {
          name: 'Geneontology search',
          url : `http://amigo.geneontology.org/amigo/search/bioentity?q=${gene}`
        }
      ];

      let div = document.createElement('div');
      links.forEach(link => {
        let a = document.createElement('a');
        a.href = link.url;
        a.classList.add('tip-link');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noreferrer noopener');
        a.appendChild(document.createTextNode(link.name));
        div.appendChild(a);
      });

      return div;
    },
    placement: 'bottom',
    interactive: true,
    appendTo: document.body
  });

  return tip;
}

cy.on('tap', 'node', (e) => {
  let node = e.target;
  let tip = makeTippy(node);
  tip.show();
});

let goFlag = 0;

var filename;

// Fetch genes belonging to an annotation term
async function term2gene(type, terms) {
  const response = await fetch('https://franklin.upsc.se:5432/athaliana/term-to-gene', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body  : JSON.stringify({
      target:[{
        name: type,
        terms: terms
      }]
    })
  });
  const json = await response.json();
  return json;
}

async function goIteration(GO) {
  if ('GO' === GO.substring(0,2)) {
    const newGO  = (GO.split(' '));
    const response = term2gene('go', newGO).then(json => {
      goList =[];
      json.go[0].ids.forEach(function(id) {
        goList.push(id);
        // console.log(id)
      })
      return goList;
    })
    const list = await response;
    return list;
  } else {
    const response = term2gene('pfam', [`${GO}`]).then(json => {
      goList =[];
      json.pfam[0].ids.forEach(function(id) {
        goList.push(id);
      })
      return goList;
    })
    const list = await response;
    return list;
  }
}

// Fetch annotations for one (or several) genes
async function gene2term(type, genes) {
  const response = await fetch('https://franklin.upsc.se:5432/athaliana/gene-to-term', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      target: type,
      genes: genes
    })
  });
  const json = await response.json();
  return json;
}

async function enrichment(type, genes) {
  const response = await fetch('https://franklin.upsc.se:5432/athaliana/enrichment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      target: type,
      genes: genes
    })
  });
  const json = await response.json();
  return json;
}

form.addEventListener('submit', function(e) {
  goFlag = 0;
  e.preventDefault();
  const formVal = form.elements['module_input'].value;
  filename = 'module_'+formVal;
  getNetworkModule(formVal, loadData);
});

gene.addEventListener('submit', function(e) {
  goFlag = 0;
  e.preventDefault();
  spinner.style.display = 'block';
  const gene_query = gene.elements['gene_input'].value
  filename = 'Gene_'+gene_query;
  getGeneNeighbourhood(gene_query, loadData);
});

//Selects node thats in the search field
search.addEventListener('submit', function(e) {
  e.preventDefault();
  const gName = search.elements['search_input'].value;
  if (cy.nodes(`node[name= "${gName}"]`).select().size() != 0) {
    cy.nodes(`node[name= "${gName}"]`).select()
  } else {
    setMessage(`"Gene ${gName}" can't be found in the current network`, 'danger');
  }
});

go.addEventListener('submit', function(e) {
  e.preventDefault();
  spinner.style.display = 'block';
  const go_var = go.elements['GO_input'].value;
  const color = go.elements['color_input'].value;
  goIteration(go_var).then(go_list => {
    cy.nodes().forEach(function(ele) {
      if(go_list.includes(ele.data('name'))) {
        ele.style('background-color', color);
      }
      spinner.style.display = 'none';
    });
  });
});

colorReset.addEventListener('click', function(e) {
  e.preventDefault();
  cy.nodes().forEach(function(ele) {
    ele.style('background-color', '#666');
  });
});

checkbox.addEventListener('change', function() {
  if (this.checked) {
    // indicate the end of your new stylesheet so that it can be updated on elements
    cy.style().selector('edge[?directionality]')
    .style({'display': 'none'}).update();
  } else {
    // indicate the end of your new stylesheet so that it can be updated on elements`node[name=${ele.data("name")}]`
    cy.style().selector('edge[?directionality]')
    .style({'display': 'element'}).update();
  }
});

checkbox2.addEventListener('change', function() {
  if (this.checked) {
    // indicate the end of your new stylesheet so that it can be updated on elements
    cy.style().selector('edge[!directionality]')
    .style({'display': 'none'}).update()
  } else {
    // indicate the end of your new stylesheet so that it can be updated on elements
    cy.style().selector('edge[!directionality]')
    .style({'display': 'element'})
    .update();
  }
});

sizeReset.addEventListener('click', function() {
  cy.fit();
});

save.addEventListener('click', function() {
  optionsObj =  {
    node: {
      css: false,
      data: true,
      position: true,
      discludeds: ['tippy']
    },
    edge: {
      css: false,
      data: true,
      discludeds: ['tippy']
    },
    layoutBy: 'cose' // string of layout name or layout function
  };
  cy.graphml(optionsObj);
  text = cy.graphml();
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', `${filename}.network.graphml`);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

});

enrich.addEventListener('click', function() {
  if (goFlag === 0) {
    goFlag = 1;
    spinner.style.display = 'block';
    let nodeNames = [];
    cy.nodes().forEach(function(ele) {
      nodeNames.push(ele.data('name'));
    });
    enrichment(['go'],nodeNames).then(json => {
      $('#goTable').remove()
      $('#goTable_wrapper').remove()
      $('.modal-content').append(`<table id="goTable" class="table table-striped table-bordered"><thead><tr><th>id</th><th>mpat</th><th>mt</th><th>name</th><th>namespace</th><th>npat</th><th>nt</th><th>padj</th><th>pval</th></tr></thead><tbody id="mod"</tbody><tfoot><tr><th>id</th><th>mpat</th><th>mt</th><th>name</th><th>namespace</th><th>npat</th><th>nt</th><th>padj</th><th>pval</th></tr></tfoot></table>`);
      var tbody = document.getElementById('mod');

      var body = "";
      json.go.forEach(term => {
        body += `<tr><td>${JSON.stringify(term.id)}</td><td>${JSON.stringify(term.mpat)}</td><td>${JSON.stringify(term.mt)}</td><td>${JSON.stringify(term.name)}</td><td>${JSON.stringify(term.namespace)}</td><td>${JSON.stringify(term.npat)}</td><td>${JSON.stringify(term.nt)}</td><td>${JSON.stringify(term.padj)}</td><td>${JSON.stringify(term.pval)}</td></td>`
      });
      tbody.innerHTML += body;

      $(document).ready( function () {
        $('#goTable').DataTable();
      });
      spinner.style.display = 'none';
      modal.style.display = 'block';
    });
  } else {
    modal.style.display = 'block';
  }
});

span.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function layoutGraph() {
  cy.layout({
      name: 'fcose',
      animate: true
    })
      .on('layoutstart', () => {
        spinner.style.display = 'block';
      })
      .on('layoutstop', () => {
        spinner.style.display = 'none';
      }).run();
}

function loadData(elements) {
  if (elements.error) {
    setMessage(elements.error, 'danger');
    console.error(elements.error);
    spinner.style.display = 'none';
    return;
  }
  cy.elements().remove();
  cy.add(elements);
  layoutGraph();
}
