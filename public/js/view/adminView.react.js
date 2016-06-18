var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var AdminSidebar = require('../components/adminSidebar.react');
var AdminTopMenu = require('../components/AdminTopMenu.react');
var AdminAppStore = require('../stores/AdminApplicationStore');

var AdminView = React.createClass({
    componentWillMount : function(){
	if(!this.props.route.user){
	    console.log("login required");
	}
	console.log(this.props.route.user);
    },
    
    getInitialState : function(){
	return {
	    user : AdminAppStore.getUser()
	}
    },
    
    render : function(){
	return (
		<Grid fluid={false}>
		<Row>
		<Col md={12}>
		<AdminTopMenu />
		</Col>
		</Row>
		<Row>
		<Col md={2}>
		<AdminSidebar User={this.state.user}/>
		</Col>
		<Col md={10}>
		{this.props.children}
	    </Col>
		</Row>
		</Grid>
	);
    }
});

module.exports = AdminView;

				     
