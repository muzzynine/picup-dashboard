var React = require('react');
var _ = require('lodash');
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;


var UserDescription = React.createClass({
    render : function(){
	var row = [];
	_.forEach(this.props.user, function(value, key){
	    if(key === 'latestReqDate'){
		value = new Date(value).toString();
	    }
	    
	    row.push(
		    <tr>
		    <td>{key}</td>
		    <td>{value}</td>
		    </tr>
	    );
	});
	
	return (
	    <div>
		<Panel header="User Description">
		<Table bordered hover>
		<tbody>
		{row}
	    </tbody>
	    </Table>
		<ButtonToolbar>
		<Button bsStyle="warning">Ban</Button>
		<Button bsStyle="danger">Danger</Button>
		</ButtonToolbar>
		</Panel>
		</div>
	);
    }
});


module.exports = UserDescription;
