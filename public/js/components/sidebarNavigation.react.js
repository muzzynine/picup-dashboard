var React = require('react');
var SidebarNavigationRow = require('./SidebarNavigationRow.react');

var SidebarNavigation = React.createClass({
    
    render : function(){
	var rows = [];

	this.props.nlist.map(function(element){
	    rows.push(<SidebarNavigationRow key={element.id} item={element} />);
	});
	
	return (
		<div>
		{rows}
	    </div>
	);
    }
});
	    
	    
module.exports = SidebarNavigation;	
