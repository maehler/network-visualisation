
const form = document.getElementById('module')

const gene = document.getElementById('gene')

const search = document.getElementById("search")

const checkbox = document.getElementById("checkbox");

const checkbox2 = document.getElementById("checkbox2");

const sizeReset = document.getElementById("sizeReset");

const go = document.getElementById("GO");

const size = document.getElementById("size")

const gif = document.getElementById("gif")

const save = document.getElementById('save')

const colorReset = document.getElementById('colorReset')

const documentation = document.getElementById('documentation')

const enrich = document.getElementById('enrich')

const modal = document.getElementById("myModal");

const span = document.getElementsByClassName("close")[0];

var cy;

var filename;

var hideTippy = function(node){
   var tippy = node.data('tippy');

   if(tippy != null){
     tippy.hide();
   }
 };
 var hideAllTippies = function(){
    cy.nodes().forEach(hideTippy);
  };
// Fetch genes belonging to an annotation term
async function term2gene(type, terms) {
    const response = await fetch("https://franklin.upsc.se:5432/athaliana/term-to-gene", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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

async function goIteration(GO){
  if("GO"===GO.substring(0,2)){
    const newGO  = (GO.split(' '))
    const response = term2gene('go',newGO).then(json =>{
        goList =[]
        json.go[0].ids.forEach(function(id){
          goList.push(id)
          // console.log(id)
        })
        return goList
      })
    const list = await response;
    return(list)
  }else{
    const response = term2gene('pfam',[`${GO}`]).then(json =>{
        goList =[]
        json.pfam[0].ids.forEach(function(id){
          goList.push(id)
        })
        return goList
      })
    const list = await response;
    return(list)
  }

}

// Fetch annotations for one (or several) genes
async function gene2term(type, genes) {
    const response = await fetch("https://franklin.upsc.se:5432/athaliana/gene-to-term", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
    const response = await fetch("https://franklin.upsc.se:5432/athaliana/enrichment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            target: type,
            genes: genes
        })
    });
    const json = await response.json();
    return json;
}


form.addEventListener('submit',function(e){
  e.preventDefault();
  hideAllTippies();
  cy.destroy()
})

gene.addEventListener('submit',function(e){
  e.preventDefault();
  hideAllTippies();
  cy.destroy()
})

form.addEventListener('submit',function(e){
  e.preventDefault();
  gif.style.display = "block";
  const formVal = form.elements['module_input'].value;
  filename = "module_"+formVal;
  getApi('/api/module/'+formVal).then((json)=>{
    if(typeof json[0] != 'undefined'){
      $('#alert').remove();
      iniCy(json);
  }else{
    gif.style.display = "none";
    $('#alert').remove();
    $('#module').append(`<div id="alert">Incorrect modul id</div>`);
  }
  }).catch((error)=> {
    console.error(error)
  });
})

gene.addEventListener('submit',function(e){
  e.preventDefault();
  gif.style.display = "block";
  const gene_query = gene.elements['gene_input'].value
  filename = "Gene_"+gene_query;
  getApi('/api/gene?name='+gene_query).then((json)=>{
    $('#alert').remove();
    iniCy(json);
  }).catch((error)=> {
    $('#alert').remove();
    $('#gene').append(`<div id="alert">Incorrect gene name</div>`);
    gif.style.display = "none";
  });
})

//Selects node thats in the search field
search.addEventListener('submit',function(e){
  e.preventDefault();
  const gName = search.elements['search_input'].value
  if(cy.nodes(`node[name= "${gName}"]`).select().size() != 0){
    $('#alert').remove();
    cy.nodes(`node[name= "${gName}"]`).select()
  }else{
    $('#alert').remove();
    $('#search').append(`<div id="alert">${gName} can't be found in displayed network</div>`);
  }
});

go.addEventListener('submit', function(e){
  e.preventDefault();
  gif.style.display = "block";
  const go_var = go.elements['GO_input'].value
  const color = go.elements['color_input'].value
  goIteration(go_var).then(go_list =>
    cy.nodes().forEach(function(ele){
      if(go_list.includes(ele.data("name"))){
        ele.style('background-color', color)
      }
      gif.style.display = "none";
    }))
})

colorReset.addEventListener('click', function(e){
  e.preventDefault();
  cy.nodes().forEach(function(ele){
    ele.style('background-color', '#666')
  })
})

checkbox.addEventListener( 'change', function() {
  if(this.checked) {
    cy.style().selector('edge[?directionality]').style({'display': 'none',}).update() // indicate the end of your new stylesheet so that it can be updated on elements
    ;} else {
      cy.style().selector('edge[?directionality]').style({'display': 'element',})
      .update() // indicate the end of your new stylesheet so that it can be updated on elements`node[name=${ele.data("name")}]`
      ;}
  });

checkbox2.addEventListener( 'change', function() {
  if(this.checked) {
    cy.style().selector('edge[!directionality]').style({'display': 'none',})
    .update() // indicate the end of your new stylesheet so that it can be updated on elements
    ;} else {
      cy.style().selector('edge[!directionality]').style({'display': 'element',})
      .update() // indicate the end of your new stylesheet so that it can be updated on elements
      ;}
  });

sizeReset.addEventListener('click', function(){
    cy.fit();
})

save.addEventListener('click', function(){
  optionsObj =  {
      node: {
        css: false,
        data: true,
        position: true,
        discludeds: ["tippy"]
      },
      edge: {
        css: false,
        data: true,
        discludeds: ["tippy"]
      },
      layoutBy: "cose" // string of layout name or layout function
  }
    cy.graphml(optionsObj)
    text = cy.graphml()
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `${filename}.network.graphml`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

})

documentation.addEventListener('click', function(){
  var element = document.createElement('a');
  element.setAttribute('href', 'https://github.com/Fattigman/projectHt2019Jacob/');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
})

enrich.addEventListener('click', function(){
  gif.style.display = "block";
  let nodeNames = []
  cy.nodes().forEach(function(ele){
    nodeNames.push(ele.data("name"))
  })
  enrichment(['go'],nodeNames).then(json=>{
    $('#goTable').remove()
    $('#goTable_wrapper').remove()
    $('.modal-content').append(`<table id="goTable" class="display"><thead><tr><th>id</th><th>mpat</th><th>mt</th><th>name</th><th>namespace</th><th>npat</th><th>nt</th><th>padj</th><th>pval</th></tr></thead><tbody id="mod"</tbody></table>`);
    var tbody = document.getElementById('mod');

    var body = ""
    json.go.forEach(term=>{
      body += `<tr><td>${JSON.stringify(term.id)}</td><td>${JSON.stringify(term.mpat)}</td><td>${JSON.stringify(term.mt)}</td><td>${JSON.stringify(term.name)}</td><td>${JSON.stringify(term.namespace)}</td><td>${JSON.stringify(term.npat)}</td><td>${JSON.stringify(term.nt)}</td><td>${JSON.stringify(term.padj)}</td><td>${JSON.stringify(term.pval)}</td></td>`
    })
    tbody.innerHTML += body;

    $(document).ready( function () {
      $('#goTable').DataTable();
    });
    gif.style.display = "none";
    modal.style.display = "block";
  }
  )
})

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
  var h = function(tag, attrs, children){
      var el = document.createElement(tag);

      Object.keys(attrs).forEach(function(key){
        var val = attrs[key];

        el.setAttribute(key, val);
      });

      children.forEach(function(child){
        el.appendChild(child);
      });

      return el;
    };
    var t = function(text){
      var el = document.createTextNode(text);

      return el;
    };
  // console.log(json);//debuggin reasons
  cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
    elements: json,
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style:{
          'background-color': '#666',
          'border-color':'black',
          'label':'data(name)',
          'font-size':4,
          'color': '#fff',
          'text-outline-color': '#888',
          'text-outline-width': 1,
          "text-valign": "top",
          "text-halign": "center",
          'border-width':'1',
          'border-color':'black',
        }
      },{
        "selector": 'edge',
        "style": {
          'width': 1,
          'curve-style': 'unbundled-bezier',
          'control-point-distance': '35px',
          'control-point-weight': '0.5',
          'edge-distances':"node-position",
          "control-point-step-size":"10px",
          "opacity": "0.4",
          "line-color": "#88A7CA",
          "overlay-padding": "3px"

        }
      },{
        "selector": 'node[[degree>=3]]',
        "style": {
          "height":"10",
          "width":"10",
      }},{
        "selector": 'node[[degree>=5]]',
        "style": {
          "height":"14",
          "width":"14",
      }},
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
        'font-size':10,
        'text-outline-width': 3,
        "text-valign": "top",
      },
    },
    {
      selector: "edge:selected",
      style: {
        'line-color': 'red',

      },
    },
    {
      selector:"node[module]",
      style:{
        'background-color':'#FFF'
      }
    },
    ],
    // layout:{
    //   name: 'cose-bilkent',
    //   idealEdgeLength: 120,
    // }
  });
  var layout = cy.layout({
    name: 'cose-bilkent',
    animate : 'end',
    nodeDimensionsIncludeLabels: false,
    // nodeRepulsion: 45000,
    avoidOverlap: true,
    idealEdgeLength: 120,
    numIter: 5000,

  })
  layout.pon('layoutstop').then(function(e){
    cy.nodes().forEach(function(ele){
      const deg = ele.degree()
      if(deg<20){
        ele.style('height', deg+4)
        ele.style('width', deg+4)
      }
    })
  })
  layout.run()
  // Created popup elements when selecting nodes with links inside
  var makeTippy = function(node, html){
     return tippy( node.popperRef(), {
       html: html,
       trigger: 'manual',
       arrow: true,
       placement: 'bottom',
       hideOnClick: false,
       interactive: true
     } ).tooltips[0];
   };



    cy.on('tap', function(e){
      if(e.target === cy){
        hideAllTippies();
      }
    });

    cy.on('tap', 'edge', function(e){
      hideAllTippies();
    });

    cy.on('zoom pan', function(e){
      hideAllTippies();
    });
    cy.nodes().forEach(function(n){
        var g = n.data('name');
        var $links = [
          {
          name: 'Arabidopsis.org',
          url: 'https://www.arabidopsis.org/servlets/TairObject?name='+g+'&type=locus'
        },{
          name: "Uniprot search",
          url : 'https://www.uniprot.org/uniprot/?query='+g+'&sort=score'
        },{
          name: "Geneontology search",
          url : 'http://amigo.geneontology.org/amigo/search/bioentity?q='+g
        },
        ].map(function( link ){
        return h('a', { target: '_blank', href: link.url, 'class': 'tip-link' }, [ t(link.name) ]);
    });
    var tippy = makeTippy(n, h('div', {}, $links));

      n.data('tippy', tippy);

      n.on('click', function(e){
        tippy.show();

        cy.nodes().not(n).forEach(hideTippy);
      });

      gif.style.display = "none";
  });
}
