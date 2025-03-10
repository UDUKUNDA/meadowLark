const express = require('express');
const  app = express();
const fortune = require('./lib/fortune.js');



// set up handlebars view engine

const handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

 

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req,res){
 
    res.render('about', {fortune: fortune.getFortune()});
});

// 500 catch-all handler (middleware)

app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)

app.use(function(err, req, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// custom 404 page

app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port') + '; press ctr-c to terminate');
});
