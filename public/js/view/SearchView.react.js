var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FilterableUserTable = require('../components/filterableUserTable.react');
var UserDescription = require('../components/UserDescription.react');

var SearchView = React.createClass({

    getInitialState : function(){
	return {
	    selectedUser : {}
	};
    },
	
    render : function(){
	return (
		<Grid fluid={false}>
		<Row>
		<Col md={6}>
		<FilterableUserTable onSelectUser={this._onSelectUser} />
		</Col>
		<Col md={4}>
		<UserDescription user={this.state.selectedUser} />
	    </Col>
		</Row>
		</Grid>
		

	);
    },

    _onSelectUser : function(user){
	this.setState({
	    selectedUser : user
	});
    }	
});


module.exports = SearchView;
