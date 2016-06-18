var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var AdminTopMenu = React.createClass({
    render : function(){
	return (
		<Grid id="div-top-menu" fluid={false}>
		<Row>
		<Col md={2}>
		<p>{"logo"}</p>
		</Col>
		<Col md={6}>
		</Col>
		<Col md={1}>
		<p>{"login"}</p>
		</Col>
		<Col md={1}>
		<p>{"settings"}</p>
		</Col>
		<Col md={2}>
		</Col>
		</Row>
		</Grid>
	);
    }
});

module.exports = AdminTopMenu;
