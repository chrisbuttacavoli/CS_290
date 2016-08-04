var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request');
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getQueryStrings(req) {
	var qParams = [];
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
	return qParams;
}

function getPostData(req) {
	var data = [];
	for (var k in req.body) {
		data.push({'key':k,'value':req.body[k]});
	}
	return data;
}

app.get('/', function(req,res){
	var context = {};
	
	context.type = 'GET';
	context.queryString = getQueryStrings(req);
	
	res.render('home', context);
});

app.post('/', function(req, res) {
	var context = {};
	
	context.type = 'POST';
	context.queryString = getQueryStrings(req);
	context.postData = getPostData(req);
	
	res.render('home', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
