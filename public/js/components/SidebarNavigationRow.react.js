var React = require('react');
var Router = require('react-router');

var SidebarNavigationRow = React.createClass({
    render : function(){
	return (
		<span><Router.Link to={this.props.item.uri}>{this.props.item.name}</Router.Link></span>
	);
    }
});

module.exports = SidebarNavigationRow;
