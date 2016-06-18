var React = require('react');

var AdminProfile = React.createClass({
    render : function(){
	return (
		<div>
		<ul>
		<li>{this.props.User.username}</li>
		<li>{this.props.User.nickname}</li>
		<li>{this.props.User.accessToken}</li>
		</ul>
		</div>
	);
    }
});

module.exports = AdminProfile;
