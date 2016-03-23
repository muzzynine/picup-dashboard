var React = require('react');

var LoginView = React.createClass({
    getInitialState : function(){
	return {
		username : '',
		password : ''
	}
    },

    
	    
    render : function(){
	return (
		<div className="loginBox">
		아이디와 비밀번호를 입력해주세요
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
	console.log(event);
    }
});

module.exports = LoginView;
