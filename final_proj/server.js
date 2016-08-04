var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var path = require('path');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res,next) {
	var context = {};
	mysql.pool.query("SELECT id, name, reps, weight, DATE_FORMAT(date, '%Y/%m/%d') AS date, lbs FROM workouts", function(err, rows, fields){
		if(err){
		  next(err);
		  return;
		}
		var records = [];
		for (var i=0; i < rows.length; i++) {
			records.push(
						{'id': rows[i]['id'],
						'name': rows[i]['name'],
						'reps': rows[i]['reps'],
						'weight': rows[i]['weight'],
						'date': rows[i]['date'],
						'lbs': rows[i]['lbs']
						});
		}
		context.records = records;
		res.render('home', context);
	});
});

app.post('/insert',function(req,res,next){
	mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) " +
	                 "VALUES (?, ?, ?, ?, ?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){		
		if(err) {
		next(err);
			return;
		}
		req.body.id = result.insertId;
		res.send(req.body);
	});
});

app.post('/delete',function(req,res,next){
	mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
		if(err){
		  next(err);
		  return;
		}
		res.send(req.body);
	});
});


app.get('/edit',function(req,res,next){
	var context = {};
	
	mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields){
		if(err){
		  next(err);
		  return;
		}
		
		// formatting date referenced from: http://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
		var myDate = new Date(rows[0]['date']);
		var month = '' + (myDate.getMonth() + 1)
		var day = '' + myDate.getDate();
		var year = myDate.getFullYear();
		
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		
		myDate = [year, month, day].join('-');
		
		context.id = rows[0]['id'];
		context.name = rows[0]['name'];
		context.reps = rows[0]['reps'];
		context.weight = rows[0]['weight'];
		context.date = myDate;
		context.lbs = rows[0]['lbs'];
		res.render('edit', context);
	});
});


app.post('/update',function(req,res,next){
  var context = {};
  console.log(req);
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        //This doesn't allow us to remove values when updating
		//[req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, req.body.lbs || curVals.lbs, req.body.id],
		[req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        res.send(req.body);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
    
      context.results = "Table reset";
      res.render('home',context);
    })
  });
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