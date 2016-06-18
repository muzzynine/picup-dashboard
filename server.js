
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var dbConnection = require('./model');
var adminController = require('./controller/adminController');

var app = express();

app.use(logger('dev'));

app.set('controller', new adminController(dbConnection));

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

app.get('/users', function(req, res){
    var adminCtl = req.app.get('controller');

    var sex = req.query.sex;
    var provider = req.query.provider;
    var offset = req.query.offset;
    var limit = req.query.limit;

    adminCtl.getUserList(sex, provider, offset, limit).then(function(result){
	res.status(200);
	res.json(result);
    }).catch(function(err){
	console.log(err);
	res.status(500);
	res.json(err);
    });
});

app.get('/user/:uid', function(req, res){
    var uid = req.params.uid;

    var adminCtl = req.app.get('controller');

    adminCtl.getUser(uid).then(function(result){
	res.status(200);
	res.json(result);
    }).catch(function(err){
	console.log(err);
	res.status(500);
	res.json(err);
    });
});

app.delete('/user/:uid', function(req, res){
    var uid = req.params.uid;

    var adminCtl = req.app.get('controller');

    adminCtl.forceSignOut(uid).then(function(){
	res.status(200);
	res.json({});
    }).catch(function(err){
	console.log(err);
	if(err.isAppError){
	    res.status(err.errorCode);
	    res.json(err);
	} else {
	    res.status(500);
	    res.json({});
	}
    });
});

app.post('/ban/:uid', function(req, res){
    var uid = req.params.uid;
    var reason = req.body.reason;
    var startDate = req.body.startDate;
    var duration = req.body.duration;

    var adminCtl = req.app.get('controller');

    adminCtl.temporaryBan(uid, reason, startDate, duration).then(function(){
	res.status(200);
	res.json({});
    }).catch(function(err){
	console.log(err);
	if(err.isAppError){
	    res.status(err.errorCode);
	    res.json(err);
	} else {
	    res.status(500);
	    res.json({});
	}
    });
});
    

app.listen(3000, function(){
    console.log("admin started");
});















