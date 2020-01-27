var express = require('express');
var path = require('path');
var cors = require('corser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');
const documentationRouter = require('./routes/documenation')
var jsRouter = require('./routes/js');
var sqlite3 = require("sqlite3").verbose();
var cytoscape = require("cytoscape");
var coseBilkent = require('cytoscape-cose-bilkent');




var app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.use('/documentation', documentationRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/js', jsRouter);
// app.get('/api/:', function(req, res) {});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
module.exports = app;
