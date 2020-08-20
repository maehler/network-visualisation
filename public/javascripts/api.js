function getNetworkModule(module, callback) {
  let url = `/api/module/${module}`
  if (!module || typeof module == 'unefined' || module.length == 0) {
    url = '/api/';
  }
  fetch(url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })
    .catch(error => console.error(error));
}
