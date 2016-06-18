var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var AdminProfile = require('./adminProfile.react');
var SidebarNavigation = require('./sidebarNavigation.react');

var AdminSidebar = React.createClass({
    render : function(){
	var category = this.props.category;

	return (
		<Grid>
		<Row>
		<Col md={2}>
		<AdminProfile User={this.props.User}/>
		</Col>
		</Row>
		<Row>
		<Col md={2}>
		<SidebarNavigation nlist={nlist}/>
		</Col>
		</Row>
		</Grid>
	);
    }
});

var nlist = [
    {
	id : 1,
	name : "Dashboard",
	uri : "control"
    },
    {
	id : 2,
	name : "Management",
	uri : "control/search"
    }
];
    
    


module.exports = AdminSidebar;
		
