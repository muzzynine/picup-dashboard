var Dispatcher = require('../services/AppDispatcher');
var AdminAppConstants = require('../constants/AdminAppConstants');
var request = require('superagent');
var Promise = require('bluebird');

var HOST_ADDR = "http://localhost:3000"

var response = {
    accessToken : "access"
};

var AdminAppAction = {
    login : function(username, password){
	//input ajax code
	var success = true;
	if(success){
	    Dispatcher.dispatch({
		type : AdminAppConstants.LOGIN_SUCCESS,
		response : response
	    });
	} else {
	    console.log("in failed action");
	    Dispatcher.dispatch({
		type : AdminAppConstants.LOGIN_FAILED,
		response : {
		    errorMessage : "login failed"
		}
	    });
	}
    },

    findUsers : function(mail, sex, provider){
	var baseUrl = HOST_ADDR + "/users";
	baseUrl += "?sex=" + sex + "&provider="+provider;
	request.get(baseUrl).end(function(err, res){
	    if(err){
		Dispatcher.dispatch({
		    type : AdminAppConstants.FIND_USERS,
		    success : false,
		    errorMessage : "find users failed"
		});
	    } else {
		Dispatcher.dispatch({
		    type : AdminAppConstants.FIND_USERS,
		    success : true,
		    customerList : res.body
		});
	    }
	});
    },

    findUser : function(mail, sex, provider){
	request.get(HOST_ADDR + "/user").end(function(err, res){	    
	    if(err){
		Dispatcher.dispatch({
		    type : AdminAppConstants.FIND_USER,
		    success : false,
		    errorMessage : "find user failed"
		});

	    } else {
		Dispatcher.dispatch({
		    type : AdminAppConstants.FIND_USER,
		    success : true,
		    customerList : res.body
		});
	    }
	});
    },

    forceSignOutUser : function(uid){
	request.delete(HOST_ADDR + "/user/" + uid).end(function(err, res){
	    if(err){
		Dispatcher.dispatch({
		    type : AdminAppConstants.FORCE_SIGN_OUT_USER,
		    success : false,
		    errorMessage : "force Sign out failed"
		});
	    } else {
		Dispatcher.dispatch({
		    type : AdminAppConstants.FORCE_SIGN_OUT_USER,
		    success: true,
		    forcedUser : uid
		});
	    }
	});
    },

    temporaryBan : function(uid, reason, start, duration){
	request.post(HOST_ADDR + "/ban/" + uid)
	    .send({
		reason : reason,
		startDate : start,
		duration : duration
	    })
	    .end(function(err, res){
		if(err){
		    Dispatcher.dispatch({
			type : AdminAppConstants.TEMPORARY_BAN_USER,
			success : false,
			errorMessage : "temporary ban failed"
		    });
		} else {
		    Dispatcher.dispatch({
			type : AdminAppConstants.TEMPORARY_BAN_USER,
			success : true,
			banInfo : {
			    uid : uid,
			    reason : reason,
			    start : start,
			    duration : duration
			}
		    });
		}
	    });
    }
	


module.exports = AdminAppAction;










