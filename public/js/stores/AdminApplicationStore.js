var Dispatcher = require('../services/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AdminAppConstants = require('../constants/AdminAppConstants');

var LOGIN_EVENT = "login";
var LOGIN_SUCCESS = "login_success";
var FIND_USERS = "find_users";

var user = {
    username : "muzzynine@bigfrogcorp.com",
    nickname : "muzzynine",
    accessToken : null
};

var findCustomerInfo = {
    customerList : []
};

var AdminAppStore = assign({}, EventEmitter.prototype, {
    getCustomerList : function(){
	return findCustomerInfo;
    },
	
    getUser : function(){
	return user;
    },
    
    addLoginReqListener : function(fn){
	this.on(LOGIN_EVENT, fn);
    },
    
    removeLoginReqListener : function(fn){
	this.removeListener(LOGIN_EVENT, fn);
    },

    emitLogin : function(err){
	this.emit(LOGIN_EVENT, err);
    },

    addLoginSuccessListener : function(fn){
	this.on(LOGIN_SUCCESS, fn);
    },

    removeLoginSuccessListener : function(fn){
	this.removeListener(LOGIN_SUCCESS, fn);
    },

    emitLoginSuccess : function(){
	this.emit(LOGIN_SUCCESS);
    },

    emitCustomerListChange : function(err){
	this.emit(FIND_USERS, err);
    },

    addCustomerListListener : function(fn){
	this.on(FIND_USERS, fn);
    },

    removeCustomerListListner : function(fn){
	this.removeListener(FIND_USERS, fn);
    }
});

    
Dispatcher.register(function(action){
    switch(action.type){
    case AdminAppConstants.LOGIN_SUCCESS :
	user.accessToken = action.response.accessToken;
	AdminAppStore.emitLoginSuccess();
	AdminAppStore.emitLogin(null);
	break;

    case AdminAppConstants.LOGIN_FAILED :
	AdminAppStore.emitLogin({
	    errorMessage : action.response.errorMessage
	});
	break;

    case AdminAppConstants.FIND_USER :
	if(action.success){
	    findCustomerInfo.customerList = action.customerList;
	    AdminAppStore.emitCustomerListChange();
	} else {
	    AdminAppStore.emitCustomerListChange(action.errorMessage);
	}
	break;

    case AdminAppConstants.FIND_USERS :
	if(action.success){
	    findCustomerInfo.customerList = action.customerList;
	    AdminAppStore.emitCustomerListChange();
	} else {
	    AdminAppStore.emitCustomerListChange(action.errorMessage);
	}
	break;
		  
    default :
	console.log("no op");
	
    }
});

module.exports = AdminAppStore;
		





