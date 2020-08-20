function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return {error: `an error occurred (HTTP ${response.status})`};
  }
}

function getNetworkModule(module, callback) {
  let url = `/api/module/${module}`
  if (!module || typeof module == 'unefined' || module.length == 0) {
    url = '/api/';
  }
  fetch(url)
    .then(handleResponse)
    .then(callback)
    .catch(error => console.error(error));
}

function getGeneNeighbourhood(geneid, callback) {
  let url = `/api/gene?name=${geneid}`;
  fetch(url)
    .then(handleResponse)
    .then(callback)
    .catch(error => console.error(error));
}
