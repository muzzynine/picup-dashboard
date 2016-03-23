
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', function(req, res){
    console.log(req.body);
    res.status(200);
    res.json({
	id : 'nam'
    });
});

app.listen(3000, function(){
    console.log("admin started");
});


