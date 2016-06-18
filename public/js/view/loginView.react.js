var React = require('react');
var Router = require('react-router');
var LoginBox = require('../components/loginBox.react');
var AdminApplicationStore = require('../stores/AdminApplicationStore');


var LoginView = React.createClass({
    getInitialState : function(){
	return {
	    auth : {
		state : "wait"
	    }
	};
    },
    
    componentDidMount: function(){
	AdminApplicationStore.addLoginReqListener(this._handleLogin);
    },

    componentWillUnmount: function(){
	AdminApplicationStore.removeLoginReqListener(this._handleLogin);
    },
    
    render : function(){
	return (
		<LoginBox auth={this.state.auth} />
	);
    },

    _handleLogin : function(err, result){
	if(err){
	    this.setState({
		auth : {
		    state : "failed",
		    errorMessage : err.errorMessage
		}
	    });
	} else {
	    console.log("success");
	 //   Router.browserHistory.push('/control');
	}
    }
});
    

module.exports = LoginView;
