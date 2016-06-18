console.log("loginbox loaded");

var React = require('react');
var AdminAppAction = require('../actions/AdminAppActions');

var LoginBox = React.createClass({
    getInitialState : function(){
	return {
		username : '',
		password : ''
	}
    },
    
    render : function(){
	var failed = [];
	if(this.props.auth.state === "failed"){
	    failed.push(<li>로그인 실패</li>);
	    failed.push(<li>{this.props.auth.errorMessage}</li>);
	}
	
	return (
		<div className="loginBox">
		<li>아이디와 비밀번호를 입력해주세요</li>
		{failed}
		<input type="text" name="id" value={this.state.username} onChange={this.handleChange} />
		<input type="password" name="pw" value={this.state.password} onChange={this.handleChange} />
		<button type="button" onClick={this.loginSubmit}>관리페이지로 접속</button>
		</div>
	);
    },

    handleChange : function(event){
	if(event.target.name === 'id'){
	    this.setState({username : event.target.value})
	} else if(event.target.name === 'pw'){
	    this.setState({password : event.target.value})
	}
    },

    loginSubmit : function(event){
	AdminAppAction.login(this.state.username, this.state.password);
    }
});

module.exports = LoginBox;
