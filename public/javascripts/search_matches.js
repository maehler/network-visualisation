var genes = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: '/api/genes'
});

var modules = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: '/api/modules'
});

// passing in `null` for the `options` arguments will result in the default
// options being used


$('#module-form input').typeahead(null, {
  name: 'id',
  source: modules
});

$('#gene-form input').typeahead(null, {
  name: 'name',
  source: genes
});

$('#search-form input').typeahead(null, {
  name: 'name',
  source: genes
});
